"use client"

import { format } from "date-fns"

interface VideoPlayerProps {
  currentTime: Date
}

export function VideoPlayer({ currentTime }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video w-full bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
        Video Player
      </div>
      <div className="absolute bottom-4 left-4 rounded bg-black/80 px-2 py-1 text-xs text-white">
        {format(currentTime, "HH:mm:ss")}
      </div>
    </div>
  )
}