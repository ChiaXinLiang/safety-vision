import type { Camera } from "./camera";
import type { LocationType } from "../constants/area";
import { Zone } from "./zone";

export interface Location {
    id: string;
    name: string;
    type: LocationType;
    description: string;
    cameras: Camera[];
    zones: Zone[];
    settings: {
        crowdAnalysis: {
            enabled: boolean;
            maxDensity: number;
            alertThreshold: number;
        };
    };
}
