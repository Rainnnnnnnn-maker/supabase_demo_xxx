'use server'

import { revalidatePath } from 'next/cache'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function addTodo(formData: FormData) {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const title = String(formData.get('title') ?? '').trim()
  if (!title) return
  await supabase
    .from('todos')
    .insert({ title })
  revalidatePath('/')
}

export async function updateTitle(id: string, formData: FormData) {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const nextTitle = String(formData.get('title') ?? '').trim()
  if (!nextTitle) return
  await supabase
    .from('todos')
    .update({ title: nextTitle, updated_at: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/')
}

export async function toggleCompleted(id: string, completed: boolean) {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  await supabase
    .from('todos')
    .update({ completed, updated_at: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/')
}

export async function logout() {
  const supabase = await getSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}
