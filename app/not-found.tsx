export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-3 text-2xl font-bold">ページが見つかりません</h1>
      <p className="mb-6 text-sm text-gray-600">URLをご確認のうえ、トップへお戻りください。</p>
      <a href="/" className="rounded bg-blue-600 px-4 py-2 text-white">トップへ戻る</a>
    </div>
  )
}
