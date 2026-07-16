'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Music, ChevronDown, Sparkles } from 'lucide-react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT?: any
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const playerRef = useRef<any>(null)
  const iframeContainerId = 'youtube-music-player-iframe'

  useEffect(() => {
    let interactionListener: (() => void) | null = null

    // Load the YouTube IFrame API script
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        initPlayer()
      }
    } else {
      initPlayer()
    }

    function initPlayer() {
      if (playerRef.current) return

      try {
        playerRef.current = new window.YT.Player(iframeContainerId, {
          height: '100%',
          width: '100%',
          videoId: '6rvv8bU3pKA',
          playerVars: {
            autoplay: 1,
            mute: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            start: 2736,
            list: 'RD6rvv8bU3pKA',
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true)
              event.target.setVolume(volume)
              
              // Attempt to play automatically
              event.target.playVideo()

              // Fallback: start playing on first document interaction if blocked by browser autoplay policy
              interactionListener = () => {
                if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
                  playerRef.current.playVideo()
                }
                cleanupInteractionListeners()
              }

              document.addEventListener('click', interactionListener)
              document.addEventListener('touchstart', interactionListener)
            },
            onStateChange: (event: any) => {
              // 1 = playing, 2 = paused, 0 = ended
              if (event.data === 1) {
                setIsPlaying(true)
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false)
              }
            },
          },
        })
      } catch (err) {
        console.error('Error initializing YouTube Player:', err)
      }
    }

    function cleanupInteractionListeners() {
      if (interactionListener) {
        document.removeEventListener('click', interactionListener)
        document.removeEventListener('touchstart', interactionListener)
        interactionListener = null
      }
    }

    return () => {
      cleanupInteractionListeners()
    }
  }, [])

  const togglePlay = () => {
    if (!isPlayerReady || !playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
      setIsPlaying(false)
    } else {
      playerRef.current.playVideo()
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    setVolume(val)
    if (playerRef.current && isPlayerReady) {
      playerRef.current.setVolume(val)
      if (val > 0 && isMuted) {
        playerRef.current.unMute()
        setIsMuted(false)
      }
    }
  }

  const toggleMute = () => {
    if (!isPlayerReady || !playerRef.current) return
    if (isMuted) {
      playerRef.current.unMute()
      setIsMuted(false)
      playerRef.current.setVolume(volume)
    } else {
      playerRef.current.mute()
      setIsMuted(true)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Minimized Float Pill */}
      <button
        onClick={() => setIsMinimized(false)}
        className={`relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/85 hover:bg-slate-800/95 text-white border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ${
          isMinimized ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none absolute'
        }`}
        title="Open Music Player"
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
        )}
        
        {/* Music icon */}
        <Music className={`w-4 h-4 transition-colors duration-300 ${isPlaying ? 'text-blue-400 animate-pulse' : 'text-slate-300'}`} />
        
        {/* Sound visualizer animation with colors */}
        <div className="flex items-end gap-0.5 h-3.5 w-5">
          <div className={`w-0.75 bg-blue-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-1' : 'h-1'}`} />
          <div className={`w-0.75 bg-indigo-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-2' : 'h-2'}`} />
          <div className={`w-0.75 bg-purple-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-3' : 'h-1.5'}`} />
          <div className={`w-0.75 bg-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-4' : 'h-2.5'}`} />
        </div>
      </button>

      {/* Expanded Glassmorphic Card */}
      <div className={`w-[300px] bg-slate-950/85 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col gap-3 origin-bottom-right ${
        !isMinimized ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none absolute bottom-0 right-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Cozy Lo-Fi Radio
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Sound visualizer animation */}
            <div className="flex items-end gap-0.5 h-4 w-6 mr-1">
              <div className={`w-0.75 bg-blue-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-1' : 'h-1'}`} />
              <div className={`w-0.75 bg-indigo-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-2' : 'h-2'}`} />
              <div className={`w-0.75 bg-purple-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-3' : 'h-1.5'}`} />
              <div className={`w-0.75 bg-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-music-bar-4' : 'h-2.5'}`} />
            </div>
            
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Minimize player"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* YouTube Iframe Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/5 bg-slate-900 shadow-inner">
          <div id={iframeContainerId} className="w-full h-full pointer-events-none" />
          
          {/* Custom overlay if player is not ready yet */}
          {!isPlayerReady && (
            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-2">
              <Music className="w-8 h-8 text-slate-500 animate-bounce" />
              <span className="text-[10px] text-slate-400 font-medium">Loading stream...</span>
            </div>
          )}
        </div>

        {/* Control Section */}
        <div className="flex flex-col gap-3 pt-1">
          {/* Song details */}
          <div className="text-center">
            <p className="text-xs font-semibold text-white truncate px-1">
              Lofi Hip Hop Radio 🎧
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </p>
          </div>

          {/* Play and Volume Bar */}
          <div className="flex items-center justify-between gap-3 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              disabled={!isPlayerReady}
              className={`p-2 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                  : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
              } disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Volume Slider & Mute */}
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={toggleMute}
                disabled={!isPlayerReady}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-300" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                disabled={!isPlayerReady}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400 focus:outline-none disabled:opacity-50"
                style={{
                  background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${isMuted ? 0 : volume}%, #334155 ${isMuted ? 0 : volume}%, #334155 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
