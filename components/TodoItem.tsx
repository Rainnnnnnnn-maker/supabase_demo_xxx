'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deleteTodo, toggleCompleted, updateTitle } from '@/app/actions/todos'

type Todo = {
  id: string
  title: string
  completed: boolean
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter()
  const [title, setTitle] = useState(todo.title)
  const [csrf, setCsrf] = useState<string>('')

  useEffect(() => {
    const name = 'csrf='
    const existing = document.cookie
      .split('; ')
      .find((v) => v.startsWith(name))
      ?.slice(name.length)
    if (existing) {
      setCsrf(existing)
      return
    }
    const arr = new Uint8Array(32)
    crypto.getRandomValues(arr)
    const token = Array.from(arr)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    document.cookie = `csrf=${token}; path=/; SameSite=Strict`
    setCsrf(token)
  }, [])

  async function onSaveTitle() {
    if (title === todo.title) return
    await updateTitle(todo.id, title, csrf)
    router.refresh()
  }

  async function onToggle() {
    await toggleCompleted(todo.id, !todo.completed, csrf)
    router.refresh()
  }

  async function onDelete() {
    await deleteTodo(todo.id, csrf)
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
