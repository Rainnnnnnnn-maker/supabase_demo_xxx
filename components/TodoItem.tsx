import { deleteTodo, toggleCompleted, updateTitle } from '@/app/actions/todos'
import type { Database } from '@/database.types'
import GuardedSubmitButton from './GuardedSubmitButton'
import OwnerBadge from './OwnerBadge'

type Todo = Database['public']['Tables']['todos']['Row']

interface TodoItemProps {
  todo: Todo
  currentUserId: string
  optimisticActions?: {
    toggle: (id: string, completed: boolean) => Promise<void>
    updateTitle: (id: string, formData: FormData) => Promise<void>
    delete: (id: string) => Promise<void>
  }
}

export default function TodoItem({ todo, currentUserId, optimisticActions }: TodoItemProps) {
  const isOwner = todo.user_id === currentUserId

  // 楽観的更新用のアクションがあればそれを使用し、なければサーバーアクションを直接使用
  const toggleAction = optimisticActions 
    ? optimisticActions.toggle.bind(null, todo.id, !todo.completed)
    : toggleCompleted.bind(null, todo.id, !todo.completed)
    
  const updateTitleAction = optimisticActions
    ? optimisticActions.updateTitle.bind(null, todo.id)
    : updateTitle.bind(null, todo.id)
    
  const deleteAction = optimisticActions
    ? optimisticActions.delete.bind(null, todo.id)
    : deleteTodo.bind(null, todo.id)

  return (
    <div className="flex items-center gap-2 rounded border border-gray-200 p-2">
      <OwnerBadge userId={todo.user_id} />
      <form action={toggleAction}>
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
      <form action={updateTitleAction} className="flex flex-1 items-center gap-2">
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
      <form action={deleteAction}>
        <GuardedSubmitButton isOwner={isOwner} className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
          削除
        </GuardedSubmitButton>
      </form>
    </div>
  )
}
