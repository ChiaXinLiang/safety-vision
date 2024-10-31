"use client";

import { CameraViewer } from "@/components/monitoring/camera-viewer";
import { Button } from "@/components/ui/button";
import { useMonitoringStore } from "@/store/monitoring";
import { useParams, useRouter } from "next/navigation";

export default function LocationEditPage() {
  const { id, locationId } = useParams();
  const router = useRouter();
  const areas = useMonitoringStore((state) => state.areas);
  const area = areas.find(a => a.id === id);
  const location = area?.locations.find(l => l.id === locationId);
  const mainCamera = location?.cameras.find(c => c.type === "main");

  if (!area || !location) {
    return <div>Location not found</div>;
  }

  const handleZoneSettings = () => {
    router.push(`/area-management/${id}/location/${locationId}/zone`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Edit Location - {location.name}
      </h1>

      <div className="space-y-8">
        {/* Camera Preview */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          {mainCamera ? (
            <CameraViewer
              imageSrc={mainCamera.views.raw}
              alt="Main Camera Latest Frame preview"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Main Camera Latest Frame preview
            </div>
          )}
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              variant="secondary"
              className="bg-white/80 backdrop-blur-sm"
              onClick={handleZoneSettings}
            >
              Setting Zone
            </Button>
            <Button variant="secondary" className="bg-white/80 backdrop-blur-sm">
              Setting Crowd Analysis
            </Button>
          </div>
        </div>

        {/* Camera List */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Camera list</h2>
            <Button variant="default">Add New Camera</Button>
          </div>

          <div className="rounded-lg border">
            {/* Header */}
            <div className="grid grid-cols-[100px_100px_1fr_200px] gap-4 border-b bg-muted/50 p-4 font-medium">
              <div>Set Main Camera</div>
              <div>Stitching to Main Camera</div>
              <div>Camera list</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Camera Items */}
            {location.cameras.map((camera) => (
              <div
                key={camera.id}
                className="grid grid-cols-[100px_100px_1fr_200px] items-center gap-4 border-b p-4 last:border-0"
              >
                <div className="flex justify-center">
                  <input
                    type="radio"
                    name="mainCamera"
                    checked={camera.type === "main"}
                    onChange={() => { }}
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={camera.type === "sub"}
                    onChange={() => { }}
                    className="h-4 w-4"
                  />
                </div>
                <div>
                  <div className="font-medium">
                    {camera.name} ({camera.type === "main" ? "Main camera" : "Sub camera"})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {camera.type === "main" ? "Panoramic camera. Camera description." : "PTZ Camera. Camera description."}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit Camera
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
          <p>note：360全景相機自動為Main Camera?</p>
        </div>
      </div>
    </div>
  );
}
