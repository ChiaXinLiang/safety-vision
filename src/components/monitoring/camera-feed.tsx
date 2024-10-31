"use client";

import type { Camera } from "@/lib/types/camera";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface CameraFeedProps {
  camera: Camera;
  className?: string;
}

export function CameraFeed({ camera, className }: CameraFeedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "raw";

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-lg cursor-pointer transition-opacity hover:opacity-90",
          className
        )}
        onClick={() => router.push(`/camera/${camera.id}?mode=${mode}`)}
      >
        <Image
          src={camera.views.raw}
          alt={`${camera.name} feed`}
          fill
          className="object-cover"
          priority={camera.type === "main"}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-medium text-white">
                {camera.name} {camera.type === "sub" && "(Sub Camera)"}
              </div>
              <div className="text-xs text-white/80">
                Last incident: {camera.lastIncident}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-white">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
