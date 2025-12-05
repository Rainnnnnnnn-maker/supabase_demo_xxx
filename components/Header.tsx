import { getSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/todos'
import OwnerBadge from '@/components/OwnerBadge'

export default async function Header() {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">TODO</h1>
      <div className="flex items-center gap-3">
        <OwnerBadge userId={user.id} />
        <form action={logout}>
          <button type="submit" className="rounded bg-gray-200 px-4 py-2 text-gray-800">
            ログアウト
          </button>
        </form>
      </div>
    </div>
  )
}
