"use client";

import { Button } from "@/components/ui/button";
import { CameraFeed } from "./camera-feed";

interface MonitoringLocationProps {
  location: {
    id: string
    name: string
    cameras: {
      id: string
      name: string
      type: "main" | "sub"
      lastIncident: string
    }[]
  }
}

export function MonitoringLocation({ location }: MonitoringLocationProps) {
  const mainCamera = location.cameras.find((c) => c.type === "main");
  const subCameras = location.cameras.filter((c) => c.type === "sub");

  return (
    <div className="rounded-lg bg-[#40B7CB] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">{location.name}</h3>
        <Button size="sm" variant="secondary">
          Switch AI Analysis
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {mainCamera && (
          <CameraFeed
            camera={mainCamera}
            className="aspect-video w-full rounded-lg bg-gray-200"
          />
        )}
        {subCameras.length > 0 && (
          <div className="grid gap-4">
            {subCameras.map((camera) => (
              <CameraFeed
                key={camera.id}
                camera={camera}
                className="aspect-video w-full rounded-lg bg-gray-200"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}