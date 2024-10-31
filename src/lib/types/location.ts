import type { Camera } from "./camera";
import type { Zone } from "./zone";

export interface Location {
  id: string;
  name: string;
  type: "production" | "storage" | "loading";
  description: string;
  cameras: Camera[];
  settings: {
    crowdAnalysis: {
      enabled: boolean;
      maxDensity: number;
      alertThreshold: number;
    };
  };
  zones: Zone[];
}
