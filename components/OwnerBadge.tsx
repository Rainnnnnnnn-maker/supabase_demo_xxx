import { userLabel } from '@/lib/userLabel'

export default function OwnerBadge({ userId }: { userId: string }) {
  const { emoji, color } = userLabel(userId)
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[12px]"
      style={{ backgroundColor: color }}
    >
      {emoji}
    </span>
  )
}
