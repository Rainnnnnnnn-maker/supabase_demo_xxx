import { Suspense } from 'react'
import TodoList from '@/components/TodoList'
import TodoSkeleton from '@/components/TodoSkeleton'
import Header from '@/components/Header'

export default function Page() {
  return (
    <main className="space-y-6">
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-200 rounded" />}>
        <Header />
      </Suspense>
      <Suspense fallback={<TodoSkeleton />}>
        <TodoList />
      </Suspense>
    </main>
  )
}
