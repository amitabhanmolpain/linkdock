'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Check } from 'lucide-react'

const links = [
  {
    id: 1,
    title: 'GitHub',
    url: 'https://github.com',
    logo: 'https://thesvg.org/icons/github/default.svg',
  },
  {
    id: 2,
    title: 'LinkedIn',
    url: 'https://linkedin.com',
    logo: 'https://thesvg.org/icons/linkedin/default.svg',
  },
  {
    id: 3,
    title: 'X',
    url: 'https://twitter.com',
    logo: 'https://thesvg.org/icons/x/default.svg',
  },
  {
    id: 4,
    title: 'Portfolio',
    url: '#',
    logo: 'https://thesvg.org/icons/figma/default.svg',
  },
  {
    id: 5,
    title: 'Email',
    url: 'mailto:amitabh@example.com',
    logo: 'https://thesvg.org/icons/gmail/default.svg',
  },
]

export default function Home() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopyLink = (id: number, url: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Coral Background */}
      <header className="bg-gradient-to-b from-[#d4a89a] to-[#c99080] pt-8 pb-32">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <button className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H9.5V10.5H0.5V11.5H9.5V20.5H10.5V11.5H19.5V10.5H10.5V1.5Z" />
            </svg>
          </button>
          <button className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
              <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
        </div>

        {/* Profile Section */}
        <div className="text-center mt-8">
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-40 h-40">
              <Image
                src="/profile.jpg"
                alt="Amitabh Anmol Pain"
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl font-bold text-white mb-2">Amitabh Anmol Pain</h1>

          {/* Bio */}
          <p className="text-white text-sm max-w-2xl mx-auto px-4 mb-6">
            SDE intern @HCLTech | 2x Hackathon Winner 🏆 | Backend Developer |Full-Stack Web Developer| AI | CSE DSCE-2027
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 justify-center items-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity"
              title="Instagram"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity"
              title="X (Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.868 6.75h-3.308l7.732-8.835L2.882 2.25h6.6l4.759 6.318L18.244 2.25zM17.002 18.808h1.834L6.822 4.146H4.881l12.121 14.662z" />
              </svg>
            </a>
            <a
              href="https://snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity"
              title="Snapchat"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Links Grid */}
        <div className="space-y-3 mb-12">
          {links.map((link) => {
            const isCopied = copiedId === link.id

            return (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('http') && !link.url.startsWith('mailto') ? '_blank' : undefined}
                rel={link.url.startsWith('http') && !link.url.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 w-full p-4 rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <img
                    src={link.logo}
                    alt={link.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                    {link.title}
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleCopyLink(link.id, link.url)
                  }}
                  className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy link"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}
