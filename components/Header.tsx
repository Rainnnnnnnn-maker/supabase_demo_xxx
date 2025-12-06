import { Suspense } from 'react'
import { logout } from '@/app/actions/todos'
import HeaderUser from '@/components/HeaderUser'

export default async function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">TODO</h1>
      <div className="flex items-center gap-3">
        <Suspense fallback={<span className="inline-block h-8 w-8 rounded-full bg-gray-200" />}>
          <HeaderUser />
        </Suspense>
        <form action={logout}>
          <button type="submit" className="rounded bg-gray-200 px-4 py-2 text-gray-800">
            ログアウト
          </button>
        </form>
      </div>
    </div>
  )
}
