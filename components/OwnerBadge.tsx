import { userLabel } from '@/lib/userLabel'

export default function OwnerBadge({ userId }: { userId: string }) {
  const { emoji, color } = userLabel(userId)
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[18px]"
      style={{ backgroundColor: color }}
    >
      {emoji}
    </span>
  )
}
