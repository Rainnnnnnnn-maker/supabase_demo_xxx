# Next.js + Supabase TODO（認証なし）

## 概要
- Next.js v16 App Router + TypeScript + Tailwind で最小TODO
- Supabase(Postgres)へ `supabase-js` で直接CRUD（RLSは当面OFF/全許可）
- 一覧は Server Component、変更は Server Actions

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
3. SQLエディタで `supabase/schema.sql` を実行
   - `todos` テーブル作成
   - RLSは一時的に OFF か、全許可 policy を設定（ファイルコメント参照）

## 開発起動
```
npm i
npm run dev
```
- `http://localhost:3000` を開いて、TODOの追加/編集/完了/削除が動作することを確認

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
- 認証無し＋RLS OFF/全許可では、誰でも読み書き可能な公開データになります
- 本番導入時は必ず RLS と認証（Supabase Auth 等）を設定
- RLS切替ポイント：`todos` に `user_id` 等の所有者列を追加し、ポリシーをユーザー単位に制限

## 技術メモ
- 変更系は Server Actions 内で `revalidatePath('/')` を実行
- Client Components 側で `router.refresh()` を併用
- Edge Runtime は使わず Node.js Runtime を前提

## 画面/操作
- 上部入力で追加
- 各行でタイトル編集（Enter/フォーカス外しで保存）、完了切替、削除