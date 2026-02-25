import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AWS Cost Optimizer | Find $1000s in Wasted Spend',
  description: 'Free AWS cost analyzer. Find wasted spend in minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
