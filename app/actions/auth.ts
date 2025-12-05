'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: { error: string }, formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  
  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}

export async function logout() {
  const supabase = await getSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}
