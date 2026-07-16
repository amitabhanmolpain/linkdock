import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import MusicPlayer from '@/components/MusicPlayer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amitabh Anmol Pain',
  description: 'Professional profile and links',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d4a89a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased bg-background">
        {children}
        <MusicPlayer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

