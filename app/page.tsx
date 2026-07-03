'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy, Check, Share2, Share, MessageSquare, Heart, Link2, Send } from 'lucide-react'

const links = [
  {
    id: 1,
    title: 'GitHub Profile',
    description: 'Check out my code and projects',
    icon: Share2,
    url: 'https://github.com',
    color: 'hover:bg-[#3a3228]',
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Professional connections',
    icon: Share,
    url: 'https://linkedin.com',
    color: 'hover:bg-[#3a3228]',
  },
  {
    id: 3,
    title: 'Twitter / X',
    description: 'Follow for updates and insights',
    icon: MessageSquare,
    url: 'https://twitter.com',
    color: 'hover:bg-[#3a3228]',
  },
  {
    id: 4,
    title: 'Instagram',
    description: 'Visual updates and stories',
    icon: Heart,
    url: 'https://instagram.com',
    color: 'hover:bg-[#3a3228]',
  },
  {
    id: 5,
    title: 'Portfolio',
    description: 'View my work and projects',
    icon: Link2,
    url: '#',
    color: 'hover:bg-[#3a3228]',
  },
  {
    id: 6,
    title: 'Email',
    description: 'Get in touch with me',
    icon: Send,
    url: 'mailto:amitabh@example.com',
    color: 'hover:bg-[#3a3228]',
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Theme Toggle */}
      <header className="border-b border-border/30">
        <div className="max-w-2xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">LinkProfile</div>
          <button className="p-2 rounded-lg bg-card/50 hover:bg-card transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Profile Section */}
        <div className="text-center mb-12">
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-32 h-32">
              <Image
                src="/profile.png"
                alt="Amitabh Anmol Pain"
                fill
                className="rounded-full object-cover border-4 border-accent/30"
                priority
              />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl font-bold mb-2 text-balance">Amitabh Anmol Pain</h1>
          <p className="text-lg text-accent mb-4">
            Full Stack Developer | Tech Enthusiast | Problem Solver
          </p>

          {/* Bio */}
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Passionate about building elegant solutions to complex problems. Specializing in web development and creating delightful user experiences.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center items-center mb-8">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card/50 hover:bg-card hover:text-accent transition-all duration-200"
              title="LinkedIn"
            >
              <Share className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card/50 hover:bg-card hover:text-accent transition-all duration-200"
              title="GitHub"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card/50 hover:bg-card hover:text-accent transition-all duration-200"
              title="Twitter / X"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card/50 hover:bg-card hover:text-accent transition-all duration-200"
              title="Instagram"
            >
              <Heart className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="space-y-3 mb-12">
          {links.map((link) => {
            const Icon = link.icon
            const isCopied = copiedId === link.id

            return (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('http') && !link.url.startsWith('mailto') ? '_blank' : undefined}
                rel={link.url.startsWith('http') && !link.url.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-4 w-full p-4 rounded-xl bg-card border border-border/20 transition-all duration-300 hover:border-accent/30 ${link.color}`}
              >
                <div className="p-3 rounded-lg bg-secondary/30 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleCopyLink(link.id, link.url)
                  }}
                  className="p-2 rounded-lg bg-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy link"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </a>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center border-t border-border/20 pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Connect with me on any of these platforms
          </p>
          <button className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors">
            Get In Touch
          </button>
        </div>
      </main>
    </div>
  )
}
