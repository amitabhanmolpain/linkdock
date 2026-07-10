'use client'

import { useEffect, useRef } from 'react'

export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.targetX = -1000
      mouse.targetY = -1000
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      // Base background color (Zinc-950)
      ctx.fillStyle = '#09090b'
      ctx.fillRect(0, 0, width, height)

      // Smooth interpolation for mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      // Grid settings
      const gridSize = 50
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
      ctx.lineWidth = 1

      // Draw base subtle grid
      ctx.beginPath()
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()

      // Draw spotlight mask and highlighted grid lines near cursor
      if (mouse.x > -500) {
        // Spotlight glow circle
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300)
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.04)') // Subtle white glow
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 300, 0, Math.PI * 2)
        ctx.fill()

        // Highlight grid lines under the cursor
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)'
        ctx.lineWidth = 1
        ctx.beginPath()
        
        const startX = Math.floor((mouse.x - 300) / gridSize) * gridSize
        const endX = Math.ceil((mouse.x + 300) / gridSize) * gridSize
        const startY = Math.floor((mouse.y - 300) / gridSize) * gridSize
        const endY = Math.ceil((mouse.y + 300) / gridSize) * gridSize

        for (let x = Math.max(0, startX); x <= Math.min(width, endX); x += gridSize) {
          ctx.moveTo(x, Math.max(0, startY))
          ctx.lineTo(x, Math.min(height, endY))
        }
        for (let y = Math.max(0, startY); y <= Math.min(height, endY); y += gridSize) {
          ctx.moveTo(Math.max(0, startX), y)
          ctx.lineTo(Math.min(width, endX), y)
        }
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#09090b]"
    />
  )
}
