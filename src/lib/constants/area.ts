export const AREA_TYPES = {
    factory: {
        type: "factory",
        label: "Factory",
        defaultZones: ["production", "storage", "loading"],
        capabilities: ["crowd_analysis", "safety_monitoring", "equipment_tracking"],
    },
    warehouse: {
        type: "warehouse",
        label: "Warehouse",
        defaultZones: ["storage", "loading", "sorting"],
        capabilities: ["inventory_tracking", "safety_monitoring"],
    },
    office: {
        type: "office",
        label: "Office",
        defaultZones: ["workspace", "meeting", "common"],
        capabilities: ["access_control", "occupancy_monitoring"],
    },
} as const;

export const LOCATION_TYPES = {
    production: {
        type: "production",
        label: "Production Area",
        requiredCameras: ["main", "sub"],
        defaultSettings: {
            crowdAnalysis: true,
            safetyZones: true,
            equipmentTracking: true,
        },
    },
    storage: {
        type: "storage",
        label: "Storage Area",
        requiredCameras: ["main"],
        defaultSettings: {
            inventoryTracking: true,
            motionDetection: true,
        },
    },
    loading: {
        type: "loading",
        label: "Loading Area",
        requiredCameras: ["main", "sub"],
        defaultSettings: {
            vehicleTracking: true,
            safetyZones: true,
        },
    },
} as const;

export const ZONE_TYPES = {
    restricted: {
        type: "restricted",
        label: "Restricted Zone",
        color: "#FF4444",
        alerts: ["unauthorized_access", "safety_violation"],
    },
    safety: {
        type: "safety",
        label: "Safety Zone",
        color: "#FFAA00",
        alerts: ["ppe_violation", "unsafe_behavior"],
    },
    monitoring: {
        type: "monitoring",
        label: "Monitoring Zone",
        color: "#44FF44",
        alerts: ["crowd_density", "loitering"],
    },
} as const;

export const AREA_SETTINGS = {
    crowdAnalysis: {
        type: "crowd_analysis",
        label: "Crowd Analysis",
        options: {
            maxDensity: 5, // people per square meter
            alertThreshold: 0.8, // 80% of max density
            trackingInterval: 30, // seconds
        },
    },
    safetyMonitoring: {
        type: "safety_monitoring",
        label: "Safety Monitoring",
        options: {
            ppeDetection: true,
            behaviorAnalysis: true,
            incidentTracking: true,
        },
    },
    accessControl: {
        type: "access_control",
        label: "Access Control",
        options: {
            restrictedHours: {
                start: "18:00",
                end: "06:00",
            },
            authorizationLevels: ["employee", "visitor", "contractor"],
        },
    },
} as const;

export const CAMERA_LAYOUT_TEMPLATES = {
    standard: {
        type: "standard",
        label: "Standard Layout",
        mainCamera: { x: 0.5, y: 0.5 }, // center position
        subCameras: [
            { x: 0.25, y: 0.25 }, // top-left
            { x: 0.75, y: 0.25 }, // top-right
            { x: 0.25, y: 0.75 }, // bottom-left
            { x: 0.75, y: 0.75 }, // bottom-right
        ],
    },
    panoramic: {
        type: "panoramic",
        label: "360° Panoramic",
        mainCamera: { x: 0.5, y: 0.5 },
        subCameras: [
            { x: 0.2, y: 0.5 },
            { x: 0.4, y: 0.5 },
            { x: 0.6, y: 0.5 },
            { x: 0.8, y: 0.5 },
        ],
    },
} as const;

// Type exports
export type AreaType = keyof typeof AREA_TYPES;
export type LocationType = keyof typeof LOCATION_TYPES;
export type ZoneType = keyof typeof ZONE_TYPES;
export type AreaSettingType = keyof typeof AREA_SETTINGS;
export type CameraLayoutType = keyof typeof CAMERA_LAYOUT_TEMPLATES;

// Default values
export const DEFAULT_AREA_CONFIG = {
    maxLocations: 10,
    maxCamerasPerLocation: 8,
    maxZonesPerLocation: 5,
    defaultCameraLayout: "standard" as CameraLayoutType,
};
