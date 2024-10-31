"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CameraFeed } from "./camera-feed";
import type { Area } from "@/lib/types/area";
import { useRouter } from "next/navigation";

interface AreaCardProps {
  area: Area;
}

export function AreaCard({ area }: AreaCardProps) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-2 sm:p-3 lg:p-4">
        <h2 className="text-base sm:text-base lg:text-lg font-semibold">{area.name}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/area-management/${area.id}`)}
          className="text-xs sm:text-xs lg:text-base"
        >
          Edit Area
        </Button>
      </div>
      <div className="space-y-4 sm:space-y-4 lg:space-y-6 p-3 sm:p-3 lg:p-6">
        {area.locations.map((location) => (
          <div key={location.id} className="rounded-lg bg-[#40B7CB] p-2 sm:p-2 lg:p-4">
            <div className="mb-2 sm:mb-2 lg:mb-4">
              <h3 className="text-base sm:text-base lg:text-lg font-medium text-white">{location.name}</h3>
            </div>

            <div className="grid gap-2 sm:gap-2 lg:gap-4 flex-col sm:flex-col lg:grid-cols-[1.5fr_1fr]">
              {/* Main Camera */}
              {location.cameras.find(c => c.type === "main") && (
                <div className="rounded-lg bg-white p-2 sm:p-2 lg:p-4">
                  <CameraFeed
                    camera={location.cameras.find(c => c.type === "main")!}
                    className="aspect-video w-full rounded-lg"
                  />
                  <div className="mt-1 sm:mt-1 lg:mt-2 flex items-center justify-between">
                    <div>
                      <div className="text-sm sm:text-sm lg:text-lg font-medium">
                        {location.cameras.find(c => c.type === "main")!.name} (Main Camera)
                      </div>
                      <div className="text-xs sm:text-xs text-muted-foreground">
                        Last incident: {location.cameras.find(c => c.type === "main")!.lastIncident}
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="text-xs sm:text-xs lg:text-base">
                      Switch AI Analysis
                    </Button>
                  </div>
                </div>
              )}

              {/* Sub Cameras */}
              {location.cameras.filter(c => c.type === "sub").length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-2 lg:gap-4">
                  {location.cameras
                    .filter(c => c.type === "sub")
                    .slice(0, 4)
                    .map((camera, index) => (
                      <div key={camera.id} className="rounded-lg bg-white p-2 sm:p-2 lg:p-4">
                        <CameraFeed
                          camera={camera}
                          className="aspect-video w-full rounded-lg"
                        />
                        <div className="mt-1 sm:mt-1 lg:mt-2">
                          <div className="text-xs sm:text-xs lg:text-sm font-medium">
                            {camera.name} (Sub Camera {index + 1})
                          </div>
                          <div className="text-[10px] sm:text-[10px] lg:text-xs text-muted-foreground">
                            Last incident: {camera.lastIncident}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
