'use client'
import { addTodo } from '@/app/actions/todos'
import { useFormStatus } from 'react-dom'

export default function AddTodoForm() {
  return (
    <form action={addTodo} className="flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="タイトルを入力"
        className="flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className={
        'rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700' +
        (pending ? ' opacity-50 cursor-not-allowed' : '')
      }
      disabled={pending}
    >
      {pending ? '追加中…' : '追加'}
    </button>
  )
}
