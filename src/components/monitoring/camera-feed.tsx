import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Camera } from "@/lib/types/monitoring"

interface CameraFeedProps {
  camera: Camera
  className?: string
}

export function CameraFeed({ camera, className }: CameraFeedProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "raw"

  return (
    <div className="space-y-2">
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg cursor-pointer transition-opacity hover:opacity-90", 
          className
        )}
        onClick={() => router.push(`/camera/${camera.id}?mode=${mode}`)}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-sm text-gray-500">
          Camera Feed
        </div>
      </div>
      <div className="space-y-1 px-1">
        <div className="text-sm font-medium text-white">
          {camera.name} {camera.type === "sub" && "(Sub Camera)"}
        </div>
        <div className="text-xs text-white/80">
          Last incident: {camera.lastIncident}
        </div>
      </div>
    </div>
  )
}