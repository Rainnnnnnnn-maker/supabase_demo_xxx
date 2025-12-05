
'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { login, logout } from '@/app/actions/auth'

export default function LoginForm() {
  const [state, action] = useActionState(login, { error: '' })

  return (
    <div className="mx-auto max-w-sm space-y-6 p-6">
      <h1 className="text-xl font-bold">ログイン</h1>
      <form action={action} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          className="w-full rounded border border-gray-300 px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          className="w-full rounded border border-gray-300 px-3 py-2"
          required
        />
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <LoginButton />
      </form>
      <form action={logout}>
        <button type="submit" className="w-full rounded bg-gray-200 px-4 py-2 text-gray-800">
          ログアウト
        </button>
      </form>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        'w-full rounded bg-blue-600 px-4 py-2 text-white' +
        (pending ? ' opacity-50 cursor-not-allowed' : '')
      }
    >
      {pending ? 'ログイン中...' : 'ログイン'}
    </button>
  )
}
