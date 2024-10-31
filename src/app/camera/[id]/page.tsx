"use client";

import { Button } from "@/components/ui/button";
import { findCameraById } from "@/lib/utils/monitoring";
import { useMonitoringStore } from "@/store/monitoring";
import { CameraViewer } from "@/components/monitoring/camera-viewer";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function CameraPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const areas = useMonitoringStore((state) => state.areas);
  const cameraWithContext = findCameraById(areas, id as string);

  if (!cameraWithContext) {
    return <div>Camera not found</div>;
  }

  const { camera, area, location } = cameraWithContext;
  const mode = searchParams.get("mode") || "raw";
  const isAIMode = mode === "ai";

  // Only allow AI mode toggle for main cameras
  const canToggleAI = camera.type === "main" && camera.views.ai;

  const toggleMode = () => {
    if (!canToggleAI) return;
    const newMode = isAIMode ? "raw" : "ai";
    router.push(`/camera/${id}?mode=${newMode}`);
  };

  // Get the correct view based on mode
  const currentView = isAIMode && camera.views.ai ? camera.views.ai : camera.views.raw;

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isAIMode ? "AI Analysis" : "Raw Screen"} - ({area.name}, {location.name})
        </h1>
        {canToggleAI && (
          <Button variant="outline" onClick={toggleMode}>
            Switch to {isAIMode ? "Raw Screen" : "AI Analysis"}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg bg-black">
          <CameraViewer
            imageSrc={currentView}
            alt={`${camera.name} feed`}
          />
        </div>

        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div>
            <h2 className="font-medium text-white">{camera.name}</h2>
            <p className="text-sm text-gray-300">
              {camera.type === "main" ? "Main Camera" : "Sub Camera"}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              {isAIMode && (
                <span className="rounded bg-blue-500/20 px-2 py-1 text-sm font-medium text-blue-200">
                  AI Enhanced
                </span>
              )}
              <span className="rounded bg-green-500/20 px-2 py-1 text-sm font-medium text-green-200">
                {mode.toUpperCase()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-300">
              Last incident: {camera.lastIncident}
            </p>
          </div>
        </div>

        {isAIMode && (
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
        )}
      </div>
    </main>
  );
}
