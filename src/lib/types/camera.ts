export type CameraMode = "raw" | "ai";

export interface Camera {
    id: string;
    name: string;
    type: "main" | "sub";
    lastIncident: string;
    status: "online" | "offline" | "maintenance";
    views: {
        raw: string;
        ai?: string;  // Only available for main cameras
    };
    settings?: {
        motionDetection: boolean;
        recordingEnabled: boolean;
        analyticsEnabled: boolean;
    };
}
