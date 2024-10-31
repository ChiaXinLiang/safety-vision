import type { Location } from "./location";
import type { AreaType } from "../constants/area";

export interface Area {
    id: string;
    name: string;
    type: AreaType;
    description?: string;
    locations: Location[];
}
