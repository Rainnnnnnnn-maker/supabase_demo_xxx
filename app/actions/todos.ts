'use server'

import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

async function validateCsrf(token: string) {
  const c = (await cookies()).get('csrf')?.value ?? ''
  if (!token || !c || token !== c) throw new Error('invalid csrf')
}

export async function addTodo(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const csrf = String(formData.get('csrf') ?? '')
  await validateCsrf(csrf)
  if (!title) return
  await supabaseServer.from('todos').insert({ title })
  revalidatePath('/')
}

export async function updateTitle(id: string, title: string, csrf: string) {
  await validateCsrf(csrf)
  const nextTitle = title.trim()
  if (!nextTitle) return
  await supabaseServer
    .from('todos')
    .update({ title: nextTitle, updated_at: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/')
}

export async function toggleCompleted(id: string, completed: boolean, csrf: string) {
  await validateCsrf(csrf)
  await supabaseServer
    .from('todos')
    .update({ completed, updated_at: new Date().toISOString() })
    .eq('id', id)
  revalidatePath('/')
}

export async function deleteTodo(id: string, csrf: string) {
  await validateCsrf(csrf)
  await supabaseServer.from('todos').delete().eq('id', id)
  revalidatePath('/')
}
