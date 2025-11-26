# Next.js + Supabase TODO（認証あり／RLS ON）

## 概要
- Next.js v16 App Router + TypeScript + Tailwind
- Supabase + RLS（認証必須／ユーザー別データアクセス）
- SSRクライアントは `@supabase/ssr` を使用（Dynamic APIs対応）

## セットアップ
1. リポジトリを取得/作成
2. `.env.local` をプロジェクト直下に作成し、以下を設定
```
NEXT_PUBLIC_SUPABASE_URL=<YOUR_NEXT_PUBLIC_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_NEXT_PUBLIC_SUPABASE_ANON_KEY>
```

## Supabase準備
1. Supabaseダッシュボードで新規プロジェクトを作成
2. Project Settings → API から Project URL と anon key を取得
3. Authentication → Email を有効化（必要に応じてConfirm Email設定）
4. SQLエディタで `supabase/schema.sql` を実行
   - `todos` テーブルに `user_id` を追加（`default auth.uid()`）
   - RLSをONにし、`user_id = auth.uid()` のポリシーを `select/insert/update/delete` に適用

## 開発起動
```
npm i
npm run dev
```
- `http://localhost:3000` へアクセス
- 未認証なら `/login` へ自動遷移
- ログイン後、TODOの追加/編集/完了/削除が動作することを確認

## デプロイ（Vercel）
1. Vercel にプロジェクトをインポート
2. `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を環境変数として設定
3. デプロイ後に動作確認

## 型生成（任意/推奨）
- Supabase CLI を使用して `database.types.ts` を生成
```
supabase gen types typescript --project-id <プロジェクトref> > database.types.ts
```
- `ref` はダッシュボードURL等から確認可能

## セキュリティ注意
- フロント側では `NEXT_PUBLIC_*` の公開キーのみを使用
- Service Roleキーはサーバー専用で管理し、フロントに置かない
- 機密値は環境変数で管理し、ログに出力しない

## 技術メモ
- 変更系は Server Actions 内で `revalidatePath('/')` を実行
- 一覧は Server Component（SSR）で常に最新を取得
- middlewareでSSRセッション更新と未認証リダイレクトを前段制御

## 画面/操作
- 上部入力で追加（Server Actions）
- 各行で「保存」ボタンでタイトル更新／完了切替／削除（Server Actions）
- 右上の「ログアウト」ボタンでサインアウト → `/login` へ遷移

## テスト・Lint
- E2Eテスト（Playwright）
  - 実行: `npm run test:e2e`
  - 環境変数: `BASE_URL`, `TEST_EMAIL`, `TEST_PASSWORD`
- Lint（ESLint v9フラットコンフィグ）
  - 実行: `npm run lint`
  - 設定: `eslint.config.mjs`
