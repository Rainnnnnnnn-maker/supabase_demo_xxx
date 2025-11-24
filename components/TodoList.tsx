import { supabaseServer } from '@/lib/supabase/server'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'

export default async function TodoList() {
  const { data } = await supabaseServer
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <AddTodoForm />
      <ul className="space-y-2">
        {(data ?? []).map((t) => (
          <li key={t.id}>
            <TodoItem todo={t} />
          </li>
        ))}
      </ul>
    </div>
  )
}