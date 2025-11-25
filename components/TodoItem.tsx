import { deleteTodo, toggleCompleted, updateTitle } from '@/app/actions/todos'

type Todo = {
  id: string
  title: string
  completed: boolean
}

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex items-center gap-2 rounded border border-gray-200 p-2">
      <form action={toggleCompleted.bind(null, todo.id, !todo.completed)}>
        <button
          type="submit"
          className={
            todo.completed
              ? 'rounded bg-green-600 px-3 py-1 text-white'
              : 'rounded bg-gray-200 px-3 py-1 text-gray-800'
          }
        >
          {todo.completed ? '完了' : '未完了'}
        </button>
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
        <button type="submit" className="rounded bg-gray-200 px-3 py-1 text-gray-800">
          保存
        </button>
      </form>
      <form action={deleteTodo.bind(null, todo.id)}>
        <button type="submit" className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
          削除
        </button>
      </form>
    </div>
  )
}
