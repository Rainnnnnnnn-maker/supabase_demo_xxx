'use client'

import { useRouter } from 'next/navigation'
import { addTodo } from '@/app/actions/todos'

export default function AddTodoForm() {
  const router = useRouter()

  async function formAction(formData: FormData) {
    await addTodo(formData)
    router.refresh()
  }

  return (
    <form action={formAction} className="flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="タイトルを入力"
        className="flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        追加
      </button>
    </form>
  )
}