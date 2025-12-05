import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/database.types'
import TodoClientList from './TodoClientList'

type Todo = Database['public']['Tables']['todos']['Row']

export default async function TodoList() {
  const supabase = await getSupabaseServerClient()
  
  // ユーザー認証状態の取得（並行して取得可能だが、依存関係があるため順次）
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
        認証が必要です。<a href="/login" className="underline">ログイン</a>してください。
      </div>
    )
  }

  // Todoデータの非同期読み込み
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
        エラーが発生しました: {error.message}
      </div>
    )
  }

  return (
    <TodoClientList 
      initialTodos={(data ?? []) as Todo[]} 
      currentUserId={user.id} 
    />
  )
}
