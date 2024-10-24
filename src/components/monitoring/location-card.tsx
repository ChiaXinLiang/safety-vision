"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { CameraFeed } from "./camera-feed"
import type { Location } from "@/lib/types/monitoring"

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "raw"
  const mainCamera = location.cameras.find((c) => c.type === "main")
  // Limit to first 4 sub cameras
  const subCameras = location.cameras
    .filter((c) => c.type === "sub")
    .slice(0, 4)

  const toggleMode = () => {
    if (!mainCamera) return
    const newMode = mode === "ai" ? "raw" : "ai"
    router.push(`/camera/${mainCamera.id}?mode=${newMode}`)
  }

  return (
    <div className="rounded-lg bg-[#40B7CB] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">{location.name}</h3>
        <Button size="sm" variant="secondary" onClick={toggleMode}>
          Switch {mode === "ai" ? "Raw Screen" : "AI Analysis"}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {/* Main Camera */}
        {mainCamera && (
          <CameraFeed
            camera={mainCamera}
            className="aspect-video w-full"
          />
        )}
        {/* Sub cameras in 2x2 grid */}
        {subCameras.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {subCameras.map((camera) => (
              <CameraFeed
                key={camera.id}
                camera={camera}
                className="aspect-video w-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}