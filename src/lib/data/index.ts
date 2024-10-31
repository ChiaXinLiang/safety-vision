import type { Area, Alert } from "../types";

export const MOCK_AREAS: Area[] = [
    {
        id: "area1",
        name: "Factory Floor A",
        type: "factory",
        description: "Main production area",
        locations: [
            {
                id: "locationA",
                name: "Assembly Line 1",
                type: "production",
                description: "Primary assembly line",
                cameras: [
                    {
                        id: "camera1",
                        name: "Main Overview Camera",
                        type: "main",
                        status: "online",
                        lastIncident: "2h ago",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    },
                    {
                        id: "camera2",
                        name: "Sub Camera 1",
                        type: "sub",
                        status: "online",
                        lastIncident: "2h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    },
                    {
                        id: "camera3",
                        name: "Sub Camera 2",
                        type: "sub",
                        status: "online",
                        lastIncident: "2h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    }
                ],
                zones: [],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 5,
                        alertThreshold: 0.8,
                    },
                },
            },
            {
                id: "locationB",
                name: "Storage Area",
                type: "storage",
                description: "Main storage area",
                cameras: [
                    {
                        id: "camera4",
                        name: "Storage Overview",
                        type: "main",
                        status: "online",
                        lastIncident: "1h ago",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    },
                    {
                        id: "camera5",
                        name: "Storage Sub 1",
                        type: "sub",
                        status: "online",
                        lastIncident: "30m ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    },
                    {
                        id: "camera6",
                        name: "Storage Sub 2",
                        type: "sub",
                        status: "online",
                        lastIncident: "45m ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    }
                ],
                zones: [],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 3,
                        alertThreshold: 0.7,
                    },
                },
            }
        ],
    },
    {
        id: "area2",
        name: "Warehouse B",
        type: "warehouse",
        description: "Secondary storage facility",
        locations: [
            {
                id: "locationC",
                name: "Loading Bay",
                type: "loading",
                description: "Main loading area",
                cameras: [
                    {
                        id: "camera7",
                        name: "Loading Bay Main",
                        type: "main",
                        status: "online",
                        lastIncident: "3h ago",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    },
                    {
                        id: "camera8",
                        name: "Loading Sub 1",
                        type: "sub",
                        status: "online",
                        lastIncident: "2h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    },
                    {
                        id: "camera9",
                        name: "Loading Sub 2",
                        type: "sub",
                        status: "online",
                        lastIncident: "1h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    }
                ],
                zones: [],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 4,
                        alertThreshold: 0.75,
                    },
                },
            },
            {
                id: "locationD",
                name: "Sorting Area",
                type: "storage",
                description: "Package sorting area",
                cameras: [
                    {
                        id: "camera10",
                        name: "Sorting Overview",
                        type: "main",
                        status: "online",
                        lastIncident: "4h ago",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    },
                    {
                        id: "camera11",
                        name: "Sorting Sub 1",
                        type: "sub",
                        status: "online",
                        lastIncident: "3h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    },
                    {
                        id: "camera12",
                        name: "Sorting Sub 2",
                        type: "sub",
                        status: "online",
                        lastIncident: "2h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    },
                    {
                        id: "camera13",
                        name: "Sorting Sub 3",
                        type: "sub",
                        status: "online",
                        lastIncident: "1h ago",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    }
                ],
                zones: [],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 4,
                        alertThreshold: 0.75,
                    },
                },
            }
        ],
    }
];

export const MOCK_ALERTS: Alert[] = [
    {
        id: "1",
        type: "safety",
        title: "Safety Violation",
        message: "Person detected without safety helmet",
        location: "Assembly Line 1",
        timestamp: new Date(),
        status: "active",
        priority: "high",
    },
    {
        id: "2",
        type: "dangerous",
        title: "Dangerous Situation",
        message: "Unauthorized access detected",
        location: "Storage Area",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: "resolved",
        priority: "critical",
        resolvedAt: new Date(Date.now() - 1000 * 60 * 25),
        resolvedBy: "John Doe",
    }
];
