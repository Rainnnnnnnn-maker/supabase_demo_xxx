import TodoList from '@/components/TodoList'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/todos'

export default async function Page() {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">TODO</h1>
        <form action={logout}>
          <button type="submit" className="rounded bg-gray-200 px-4 py-2 text-gray-800">
            ログアウト
          </button>
        </form>
      </div>
      <TodoList currentUserId={user.id} />
    </main>
  )
}
