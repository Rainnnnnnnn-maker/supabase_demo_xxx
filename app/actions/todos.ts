'use server'

import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabase/server'

export async function addTodo(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  if (!title) return
  await supabaseServer.from('todos').insert({ title })
  revalidatePath('/')
}

export async function updateTitle(id: string, title: string) {
  const nextTitle = title.trim()
  if (!nextTitle) return
  await supabaseServer
    .from('todos')
    .update({ title: nextTitle, updated_at: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/')
}

export async function toggleCompleted(id: string, completed: boolean) {
  await supabaseServer
    .from('todos')
    .update({ completed, updated_at: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  await supabaseServer.from('todos').delete().eq('id', id)
  revalidatePath('/')
}