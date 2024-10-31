import type { Area } from "../types/area";
import type { Alert } from "../types/alert";

export const MOCK_AREAS: Area[] = [
    {
        id: "area1",
        name: "Factory Floor A",
        type: "factory",
        description: "Main manufacturing facility with assembly lines and storage areas",
        locations: [
            {
                id: "locationA",
                name: "Assembly Line 1",
                type: "production",
                description: "Main assembly line for product manufacturing",
                cameras: [
                    {
                        id: "camera1",
                        name: "Main Assembly Camera",
                        type: "main",
                        lastIncident: "2h ago",
                        status: "online",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    },
                    {
                        id: "camera2",
                        name: "Sub Assembly Camera",
                        type: "sub",
                        lastIncident: "2h ago",
                        status: "online",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    }
                ],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 5,
                        alertThreshold: 0.8
                    }
                },
                zones: [
                    {
                        id: "zone1",
                        name: "Assembly Line Zone 1",
                        detectionDisplayGroup: ["detection_group_1", "detection_group_2"],
                        violationType: ["violation_type_1"]
                    },
                    {
                        id: "zone2",
                        name: "Assembly Line Zone 2",
                        detectionDisplayGroup: ["detection_group_2"],
                        violationType: ["violation_type_1", "violation_type_2"]
                    }
                ]
            },
            {
                id: "locationB",
                name: "Storage Area 1",
                type: "storage",
                description: "Primary storage area for raw materials and finished products",
                cameras: [
                    {
                        id: "camera3",
                        name: "Storage Main Camera",
                        type: "main",
                        lastIncident: "1h ago",
                        status: "online",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    }
                ],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 3,
                        alertThreshold: 0.7
                    }
                },
                zones: [
                    {
                        id: "zone3",
                        name: "Storage Zone 1",
                        detectionDisplayGroup: ["detection_group_3"],
                        violationType: ["violation_type_3"]
                    }
                ]
            }
        ]
    },
    {
        id: "area2",
        name: "Warehouse B",
        type: "warehouse",
        description: "Secondary warehouse facility for storage and distribution",
        locations: [
            {
                id: "locationC",
                name: "Loading Bay",
                type: "loading",
                description: "Main loading bay for incoming and outgoing shipments",
                cameras: [
                    {
                        id: "camera4",
                        name: "Loading Bay Main Camera",
                        type: "main",
                        lastIncident: "30m ago",
                        status: "online",
                        views: {
                            raw: "/camera/main-camera.png",
                            ai: "/camera/ai-camera.png"
                        }
                    },
                    {
                        id: "camera5",
                        name: "Loading Bay Sub Camera",
                        type: "sub",
                        lastIncident: "45m ago",
                        status: "online",
                        views: {
                            raw: "/camera/sub-camera.png"
                        }
                    }
                ],
                settings: {
                    crowdAnalysis: {
                        enabled: true,
                        maxDensity: 4,
                        alertThreshold: 0.75
                    }
                },
                zones: [
                    {
                        id: "zone4",
                        name: "Loading Zone 1",
                        detectionDisplayGroup: ["detection_group_1"],
                        violationType: ["violation_type_4"]
                    },
                    {
                        id: "zone5",
                        name: "Loading Zone 2",
                        detectionDisplayGroup: ["detection_group_2"],
                        violationType: ["violation_type_1"]
                    }
                ]
            }
        ]
    }
];

export const MOCK_ALERTS: Alert[] = [
    {
        id: "1",
        type: "safety",
        title: "Safety Violation",
        message: "Person detected in restricted zone",
        location: "Assembly Line 1",
        timestamp: new Date(),
        status: "active",
        priority: "high"
    },
    {
        id: "2",
        type: "dangerous",
        title: "Chemical Storage Alert",
        message: "Unauthorized access detected",
        location: "Storage Area 1",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        status: "active",
        priority: "critical"
    },
    {
        id: "3",
        type: "safety",
        title: "PPE Violation",
        message: "Missing safety helmet in PPE zone",
        location: "Loading Bay",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: "resolved",
        priority: "medium",
        resolvedAt: new Date(Date.now() - 1000 * 60 * 20),
        resolvedBy: "John Smith"
    }
];
