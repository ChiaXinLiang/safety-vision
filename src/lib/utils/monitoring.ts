import type { Area } from "@/lib/types/monitoring"

interface CameraWithContext {
  id: string
  name: string
  type: "main" | "sub"
  lastIncident: string
  area: Area
  location: Area["locations"][0]
}

export function findCameraById(areas: Area[], cameraId: string): CameraWithContext | undefined {
  for (const area of areas) {
    for (const location of area.locations) {
      const camera = location.cameras.find((c) => c.id === cameraId)
      if (camera) {
        return {
          ...camera,
          area,
          location,
        }
      }
    }
  }
  return undefined
}