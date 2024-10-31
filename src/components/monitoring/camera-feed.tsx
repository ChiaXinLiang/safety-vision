"use client";

import CameraViewer from "@/components/monitoring/camera-viewer";
import type { Camera } from "@/lib/types/camera";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CameraFeedProps {
  camera: Camera;
  className?: string;
}

export function CameraFeed({ camera, className }: CameraFeedProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer transition-opacity hover:opacity-90",
        className
      )}
      onClick={() => router.push(`/camera/${camera.id}`)}
    >
      <CameraViewer
        src={camera.views.raw}
        className="w-full h-full"
      />
      {camera.status === "offline" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
            Offline
          </span>
        </div>
      )}
    </div>
  );
}
