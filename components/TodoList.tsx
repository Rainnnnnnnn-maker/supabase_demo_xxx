import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/database.types'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'

type Todo = Database['public']['Tables']['todos']['Row']

export default async function TodoList() {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          認証が必要です。<a href="/login" className="underline">ログイン</a>してください。
        </div>
      )}
      <AddTodoForm />
      <ul className="space-y-2">
        {((data ?? []) as Todo[]).map((t) => (
          <li key={t.id}>
            <TodoItem todo={t} />
          </li>
        ))}
      </ul>
    </div>
  )
}
