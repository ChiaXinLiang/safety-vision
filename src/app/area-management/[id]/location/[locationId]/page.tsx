"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useMonitoringStore } from "@/store/monitoring"
import { CameraDialog } from "@/components/monitoring/camera-dialog"
import type { Camera } from "@/lib/types/monitoring"

export default function EditLocationPage() {
  const { id, locationId } = useParams()
  const router = useRouter()
  const areas = useMonitoringStore((state) => state.areas)
  const area = areas.find((a) => a.id === id)
  const location = area?.locations.find((l) => l.id === locationId)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<Camera | undefined>()

  if (!area || !location) {
    return <div>Location not found</div>
  }

  const handleAddCamera = () => {
    setSelectedCamera(undefined)
    setDialogOpen(true)
  }

  const handleEditCamera = (camera: Camera) => {
    setSelectedCamera(camera)
    setDialogOpen(true)
  }

  const handleSaveCamera = (data: Partial<Camera>) => {
    // Handle save logic here
    console.log("Save camera:", data)
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Edit Location - {location.name}
      </h1>

      <div className="space-y-6">
        {/* Preview Section */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
          <div className="absolute right-4 top-4 flex gap-2">
            <Button size="sm" variant="secondary">
              Add New Zone
            </Button>
            <Button size="sm" variant="secondary">
              Delete Zone
            </Button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            Main Camera screen preview
          </div>
        </div>

        {/* Camera List */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-medium">Camera</h2>
            <Button onClick={handleAddCamera}>Add New Camera</Button>
          </div>

          {location.cameras.map((camera) => (
            <div
              key={camera.id}
              className="flex items-center justify-between border-b p-4 last:border-0"
            >
              <div>
                <h3 className="font-medium">
                  {camera.name} {camera.type === "main" && "(Main camera)"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  camera description.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => handleEditCamera(camera)}
                >
                  Edit Camera
                </Button>
                <Button variant="ghost" className="text-destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <CameraDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        camera={selectedCamera}
        onSave={handleSaveCamera}
      />
    </main>
  )
}