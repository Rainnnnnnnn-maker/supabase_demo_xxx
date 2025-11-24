import TodoList from '@/components/TodoList'

export default function Page() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">TODO</h1>
      <TodoList />
    </main>
  )
}