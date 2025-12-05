'use client'

import { useOptimistic, useRef } from 'react'
import { addTodo, deleteTodo, toggleCompleted, updateTitle } from '@/app/actions/todos'
import type { Database } from '@/database.types'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'

type Todo = Database['public']['Tables']['todos']['Row']

interface TodoClientListProps {
  initialTodos: Todo[]
  currentUserId: string
}

export default function TodoClientList({ initialTodos, currentUserId }: TodoClientListProps) {
  type OptimisticAction =
    | { type: 'add'; payload: Todo }
    | { type: 'update'; payload: Partial<Todo> & { id: string } }
    | { type: 'delete'; payload: string }

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case 'add':
          return [action.payload, ...state]
        case 'update':
          return state.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload } : t))
        case 'delete':
          return state.filter((t) => t.id !== action.payload)
        default:
          return state
      }
    }
  )

  const formRef = useRef<HTMLFormElement>(null)

  async function handleAdd(formData: FormData) {
    const title = String(formData.get('title') ?? '').trim()
    if (!title) return

    const newTodo: Todo = {
      id: crypto.randomUUID(), // Temporary ID
      title,
      completed: false,
      user_id: currentUserId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    addOptimisticTodo({ type: 'add', payload: newTodo })
    formRef.current?.reset()
    await addTodo(formData)
  }

  return (
    <div className="space-y-6">
      <AddTodoForm action={handleAdd} formRef={formRef} />
      <ul className="space-y-2">
        {optimisticTodos.map((t) => (
          <li key={t.id}>
            <TodoItem 
              todo={t} 
              currentUserId={currentUserId} 
              optimisticActions={{
                toggle: async (id, completed) => {
                  addOptimisticTodo({ type: 'update', payload: { id, completed } })
                  await toggleCompleted(id, completed)
                },
                updateTitle: async (id, formData) => {
                  const title = String(formData.get('title') ?? '').trim()
                  if (title) {
                    addOptimisticTodo({ type: 'update', payload: { id, title } })
                    await updateTitle(id, formData)
                  }
                },
                delete: async (id) => {
                  addOptimisticTodo({ type: 'delete', payload: id })
                  await deleteTodo(id)
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
