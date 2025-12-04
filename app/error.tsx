'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <p className="mb-4 text-sm text-red-600">エラーが発生しました: {error.message}</p>
      <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => reset()}>再試行</button>
    </div>
  )
}
