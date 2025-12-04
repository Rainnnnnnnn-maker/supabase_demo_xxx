'use client'
import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

export default function GuardedSubmitButton({
  isOwner,
  children,
  className,
  message = 'このTodoは他のユーザーが作成したものです。編集/削除する権限がありません'
}: {
  isOwner: boolean
  children: ReactNode
  className?: string
  message?: string
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { pending } = useFormStatus()
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isOwner) {
      e.preventDefault()
      setOpen(true)
    }
  }
  function onClose() {
    const form = buttonRef.current?.closest('form') as HTMLFormElement | null
    form?.reset()
    setOpen(false)
  }
  return (
    <>
      <button
        ref={buttonRef}
        type="submit"
        className={(className ?? '') + (pending ? ' opacity-50 cursor-not-allowed' : '')}
        onClick={onClick}
        disabled={pending}
      >
        {children}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-sm rounded bg-white p-4 shadow">
            <p className="mb-4 text-sm text-gray-800">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
