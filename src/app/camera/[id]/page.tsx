"use client";

import { Button } from "@/components/ui/button";
import { findCameraById } from "@/lib/utils/monitoring";
import { useMonitoringStore } from "@/store/monitoring";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function CameraPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const areas = useMonitoringStore((state) => state.areas);
  const camera = findCameraById(areas, id as string);
  
  if (!camera) {
    return <div>Camera not found</div>;
  }

  const { area, location } = camera;
  const mode = searchParams.get("mode") || "raw";
  const isAIMode = mode === "ai";

  const toggleMode = () => {
    const newMode = isAIMode ? "raw" : "ai";
    router.push(`/camera/${id}?mode=${newMode}`);
  };

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isAIMode ? "AI Analysis" : "Raw Screen"} - ({area.name}, {location.name})
        </h1>
        <Button variant="outline" onClick={toggleMode}>
          Switch {isAIMode ? "Raw Screen" : "AI Analysis"}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            {isAIMode ? "AI-Processed Footage" : "Raw Screen"}
          </div>
        </div>
        
        {isAIMode ? (
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-lg font-medium">Personnel Count</h3>
              <div className="space-y-1 text-sm">
                <p>Total: 24</p>
                <p>With Safety Gear: 22</p>
                <p>Without Safety Gear: 2</p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Safety Violations</h3>
              <div className="space-y-1 text-sm">
                <p>Helmet Violations: 1</p>
                <p>Vest Violations: 1</p>
                <p>Restricted Area Access: 0</p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Equipment Status</h3>
              <div className="space-y-1 text-sm">
                <p>Active Machinery: 3</p>
                <p>Idle Machinery: 2</p>
                <p>Maintenance Required: 1</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">
              {camera.name} {camera.type === "sub" && "(Sub Camera)"}
            </div>
            <div className="text-sm text-gray-500">
              Last incident: {camera.lastIncident}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}