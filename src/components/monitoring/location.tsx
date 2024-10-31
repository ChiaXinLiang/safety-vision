"use client";

import { Button } from "@/components/ui/button";
import { CameraFeed } from "./camera-feed";
import type { Camera } from "@/lib/types/camera";

interface MonitoringLocationProps {
  location: {
    id: string;
    name: string;
    cameras: Camera[];
  };
}

export function MonitoringLocation({ location }: MonitoringLocationProps) {
  const mainCamera = location.cameras.find((c) => c.type === "main");
  // Get up to 3 sub cameras
  const subCameras = location.cameras
    .filter((c) => c.type === "sub")
    .slice(0, 3);

  return (
    <div className="rounded-lg bg-[#40B7CB] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">{location.name}</h3>
        <Button size="sm" variant="secondary">
          Switch AI Analysis
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {/* Main Camera */}
        {mainCamera && (
          <div>
            <CameraFeed
              camera={mainCamera}
              className="aspect-video w-full rounded-lg bg-gray-200"
            />
            <div className="mt-2 text-sm text-white">
              {mainCamera.name} (Main Camera)
              <div className="text-white/80">Last incident: {mainCamera.lastIncident}</div>
            </div>
          </div>
        )}

        {/* Sub Cameras */}
        {subCameras.length > 0 && (
          <div className="grid gap-4">
            {subCameras.map((camera) => (
              <div key={camera.id}>
                <CameraFeed
                  camera={camera}
                  className="aspect-video w-full rounded-lg bg-gray-200"
                />
                <div className="mt-1 text-sm text-white">
                  {camera.name} (Sub Camera)
                  <div className="text-white/80">Last incident: {camera.lastIncident}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export for use in other components
export type { MonitoringLocationProps };
