export const CAMERA_INFO = {
    main: {
        type: "main",
        label: "Main Camera",
        image: "/camera/main-camera.png",
        priority: true,
        capabilities: ["motion_detection", "recording", "live_stream"] as const,
        resolution: {
            width: 1920,
            height: 1080,
            aspectRatio: "16:9"
        }
    },
    sub: {
        type: "sub",
        label: "Sub Camera",
        image: "/camera/sub-camera.png",
        priority: false,
        capabilities: ["recording", "live_stream"] as const,
        resolution: {
            width: 1280,
            height: 720,
            aspectRatio: "16:9"
        }
    },
    ai: {
        type: "ai",
        label: "AI Camera",
        image: "/camera/ai-camera.png",
        priority: true,
        capabilities: ["motion_detection", "object_detection", "recording", "live_stream", "analytics"] as const,
        resolution: {
            width: 1920,
            height: 1080,
            aspectRatio: "16:9"
        }
    }
} as const;

export type CameraType = keyof typeof CAMERA_INFO;
export type CameraCapability = typeof CAMERA_INFO[CameraType]["capabilities"][number];
