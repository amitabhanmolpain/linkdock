'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Check, Star, Sparkles } from 'lucide-react'

const links = [
  {
    id: 1,
    title: 'GitHub',
    url: 'https://github.com/amitabhanmolpain',
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
    url: 'https://x.com/AnmolPain22790',
    logo: 'https://thesvg.org/icons/x/default.svg',
  },
  {
    id: 4,
    title: 'Portfolio',
    url: 'https://amitabh-anmol-pain.vercel.app/',
    logo: 'https://thesvg.org/icons/vercel/default.svg',
  },
  {
    id: 5,
    title: 'Gmail',
    url: 'mailto:amitabhanmolpain888@gmail.com',
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Dark Gradient */}
      <header className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 pt-8 pb-32">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <a
            href="https://github.com/amitabhanmolpain/linkdock"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 hover:border-white/20 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
            title="Star on GitHub"
          >
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span>Star on GitHub</span>
          </a>
          <a
            href="https://github.com/amitabhanmolpain/linkdock/fork"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-white font-semibold text-xs border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
            title="Create Yours"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Create Yours</span>
          </a>
        </div>

        {/* Profile Section */}
        <div className="text-center mt-8">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48">
              <Image
                src="/profile.jpg"
                alt="Amitabh Anmol Pain"
                fill
                className="rounded-full object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl font-bold text-white mb-2">Amitabh Anmol Pain</h1>

          {/* Bio */}
          <p className="text-white text-base font-semibold max-w-2xl mx-auto px-4 mb-6">
            SDE intern @HCLTech | 2x Hackathon Winner 🏆 | Backend Developer |Full-Stack Web Developer| AI | CSE DSCE-2027
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center items-center">
            <a
              href="https://instagram.com/Zo_Zo_King_16"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-600/20 hover:from-pink-500/50 hover:to-pink-600/40 transition-all duration-300 border border-pink-400/30 hover:border-pink-400/60 shadow-lg hover:shadow-pink-500/30"
              title="Instagram"
            >
              <img src="https://thesvg.org/icons/instagram/default.svg" alt="Instagram" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://x.com/AnmolPain22790"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 hover:from-blue-500/50 hover:to-blue-600/40 transition-all duration-300 border border-blue-400/30 hover:border-blue-400/60 shadow-lg hover:shadow-blue-500/30"
              title="X (Twitter)"
            >
              <img src="https://thesvg.org/icons/x/default.svg" alt="X" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-700/20 hover:from-blue-600/50 hover:to-blue-700/40 transition-all duration-300 border border-blue-400/30 hover:border-blue-400/60 shadow-lg hover:shadow-blue-600/30"
              title="LinkedIn"
            >
              <img src="https://thesvg.org/icons/linkedin/default.svg" alt="LinkedIn" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://snapchat.com/add/zozoking_16"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 hover:from-yellow-500/50 hover:to-yellow-600/40 transition-all duration-300 border border-yellow-400/30 hover:border-yellow-400/60 shadow-lg hover:shadow-yellow-500/30"
              title="Snapchat"
            >
              <img src="https://thesvg.org/icons/snapchat/default.svg" alt="Snapchat" className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12 relative z-10">
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
                className="group flex items-center gap-6 w-full p-5 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-600/30 border border-slate-500/30 transition-all duration-300 hover:from-slate-600/60 hover:to-slate-500/40 hover:border-slate-400/50 hover:shadow-lg hover:shadow-slate-900/50"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700">
                  <img
                    src={link.logo}
                    alt={link.title}
                    width={36}
                    height={36}
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex-1 text-center">
                  <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">
                    Amitabh Anmol Pain {link.title}
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
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-300" />
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
