'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteTodo, toggleCompleted, updateTitle } from '@/app/actions/todos'

type Todo = {
  id: string
  title: string
  completed: boolean
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter()
  const [title, setTitle] = useState(todo.title)

  async function onSaveTitle() {
    if (title === todo.title) return
    await updateTitle(todo.id, title)
    router.refresh()
  }

  async function onToggle() {
    await toggleCompleted(todo.id, !todo.completed)
    router.refresh()
  }

  async function onDelete() {
    await deleteTodo(todo.id)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2 rounded border border-gray-200 p-2">
      <button
        onClick={onToggle}
        className={
          todo.completed
            ? 'rounded bg-green-600 px-3 py-1 text-white'
            : 'rounded bg-gray-200 px-3 py-1 text-gray-800'
        }
      >
        {todo.completed ? '完了' : '未完了'}
      </button>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={onSaveTitle}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
        }}
        className={
          'flex-1 rounded border border-gray-300 px-3 py-1 ' +
          (todo.completed ? 'line-through text-gray-500' : '')
        }
      />
      <button
        onClick={onDelete}
        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
      >
        削除
      </button>
    </div>
  )
}