import './globals.css'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-white text-gray-900">
        <div className="mx-auto max-w-xl p-6">
          {children}
        </div>
      </body>
    </html>
  )
}