import { getSupabaseServerClient } from '@/lib/supabase/server'
import OwnerBadge from '@/components/OwnerBadge'

export default async function HeaderUser() {
  const supabase = await getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return <OwnerBadge userId={user.id} />
}
