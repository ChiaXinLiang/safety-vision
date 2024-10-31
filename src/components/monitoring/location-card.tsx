"use client";

import { CameraFeed } from "@/components/monitoring/camera-feed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Location } from "@/lib/types/location";
import { useRouter } from "next/navigation";

interface LocationCardProps {
  areaId: string;
  location: Location;
  className?: string;
}

export function LocationCard({ areaId, location, className }: LocationCardProps) {
  const router = useRouter();
  const mainCamera = location.cameras.find((c) => c.type === "main");

  const handleEditLocation = () => {
    router.push(`/area-management/${areaId}/location/${location.id}`);
  };

  const handleViewCamera = (cameraId: string) => {
    router.push(`/camera/${cameraId}`);
  };

  return (
    <Card className={className}>
      <div className="relative">
        {mainCamera && (
          <CameraFeed
            camera={mainCamera}
            className="aspect-video w-full"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="mb-1 text-lg font-semibold text-white">
            {location.name}
          </h3>
          <p className="text-sm text-gray-300">
            {location.cameras.length} Camera{location.cameras.length !== 1 && "s"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4">
        <Button variant="outline" onClick={handleEditLocation}>
          Edit Location
        </Button>
        {mainCamera && (
          <Button
            variant="outline"
            onClick={() => handleViewCamera(mainCamera.id)}
          >
            View Camera
          </Button>
        )}
      </div>
    </Card>
  );
}
