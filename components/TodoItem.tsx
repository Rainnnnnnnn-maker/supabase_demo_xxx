import { deleteTodo, toggleCompleted, updateTitle } from '@/app/actions/todos'
import type { Database } from '@/database.types'
import GuardedSubmitButton from './GuardedSubmitButton'
import OwnerBadge from './OwnerBadge'

type Todo = Database['public']['Tables']['todos']['Row']

export default function TodoItem({ todo, currentUserId }: { todo: Todo; currentUserId: string }) {
  const isOwner = todo.user_id === currentUserId
  return (
    <div className="flex items-center gap-2 rounded border border-gray-200 p-2">
      <form action={toggleCompleted.bind(null, todo.id, !todo.completed)}>
        <GuardedSubmitButton
          isOwner={isOwner}
          className={
            todo.completed
              ? 'rounded bg-green-600 px-3 py-1 text-white'
              : 'rounded bg-gray-200 px-3 py-1 text-gray-800'
          }
        >
          {todo.completed ? '完了' : '未完了'}
        </GuardedSubmitButton>
      </form>
      <form action={updateTitle.bind(null, todo.id)} className="flex flex-1 items-center gap-2">
        <input
          name="title"
          defaultValue={todo.title}
          className={
            'flex-1 rounded border border-gray-300 px-3 py-1 ' +
            (todo.completed ? 'line-through text-gray-500' : '')
          }
        />
        <GuardedSubmitButton isOwner={isOwner} className="rounded bg-gray-200 px-3 py-1 text-gray-800">
          保存
        </GuardedSubmitButton>
      </form>
      <form action={deleteTodo.bind(null, todo.id)}>
        <GuardedSubmitButton isOwner={isOwner} className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
          削除
        </GuardedSubmitButton>
      </form>
      <span className="ml-auto"><OwnerBadge userId={todo.user_id} /></span>
    </div>
  )
}
