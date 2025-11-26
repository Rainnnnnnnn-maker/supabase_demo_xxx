'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')

  async function onLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      return
    }
    router.replace('/')
  }

  async function onLogout() {
    await supabaseBrowser.auth.signOut()
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 p-6">
      <h1 className="text-xl font-bold">ログイン</h1>
      <form onSubmit={onLogin} className="space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded bg-blue-600 px-4 py-2 text-white">
          ログイン
        </button>
      </form>
      <button onClick={onLogout} className="w-full rounded bg-gray-200 px-4 py-2 text-gray-800">
        ログアウト
      </button>
    </div>
  )
}
