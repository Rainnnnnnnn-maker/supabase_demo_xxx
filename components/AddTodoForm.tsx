
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { addTodo } from '@/app/actions/todos'

export default function AddTodoForm() {
  const router = useRouter()
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

  async function formAction(formData: FormData) {
    await addTodo(formData)
    router.refresh()
  }

  return (
    <form action={formAction} className="flex gap-2">
      <input type="hidden" name="csrf" value={csrf} />
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
