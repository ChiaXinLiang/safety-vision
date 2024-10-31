import type { Area } from "@/lib/types/area";
import type { Camera } from "@/lib/types/camera";

export interface CameraWithContext {
  camera: Camera;
  area: Area;
  location: Area["locations"][0];
}

export function findCameraById(areas: Area[], cameraId: string): CameraWithContext | undefined {
  for (const area of areas) {
    for (const location of area.locations) {
      const camera = location.cameras.find((c) => c.id === cameraId);
      if (camera) {
        return {
          camera,
          area,
          location,
        };
      }
    }
  }
  return undefined;
}
