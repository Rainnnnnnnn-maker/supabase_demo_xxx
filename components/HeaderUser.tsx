import { getSupabaseServerClient } from '@/lib/supabase/server'
import OwnerBadge from '@/components/OwnerBadge'

export default async function HeaderUser() {
  const supabase = await getSupabaseServerClient()
  let userId: string | null = null
  try {
    const { data: { user } } = await supabase.auth.getUser()
    userId = user?.id ?? null
  } catch {}
  if (!userId) return null
  return <OwnerBadge userId={userId} />
}
