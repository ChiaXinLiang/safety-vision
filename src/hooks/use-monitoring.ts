"use client";

import { create } from "zustand";

export const MOCK_AREAS = [
  {
    id: "area1",
    name: "Area 1",
    locations: [
      {
        id: "locationA",
        name: "Location A",
        cameras: [
          {
            id: "camera1",
            name: "Camera 1",
            type: "main" as const,
            lastIncident: "2h ago",
          },
          {
            id: "camera2",
            name: "Camera 2",
            type: "sub" as const,
            lastIncident: "2h ago",
          },
        ],
      },
      {
        id: "locationB",
        name: "Location B",
        cameras: [
          {
            id: "camera3",
            name: "Camera 3",
            type: "main" as const,
            lastIncident: "2h ago",
          },
        ],
      },
    ],
  },
  {
    id: "area2",
    name: "Area 2",
    locations: [
      {
        id: "locationC",
        name: "Location C",
        cameras: [
          {
            id: "camera4",
            name: "Camera 4",
            type: "main" as const,
            lastIncident: "2h ago",
          },
        ],
      },
      {
        id: "locationD",
        name: "Location D",
        cameras: [
          {
            id: "camera5",
            name: "Camera 5",
            type: "main" as const,
            lastIncident: "2h ago",
          },
          {
            id: "camera6",
            name: "Camera 6",
            type: "sub" as const,
            lastIncident: "2h ago",
          },
          {
            id: "camera7",
            name: "Camera 7",
            type: "sub" as const,
            lastIncident: "2h ago",
          },
          {
            id: "camera8",
            name: "Camera 8",
            type: "sub" as const,
            lastIncident: "2h ago",
          },
        ],
      },
    ],
  },
];

interface MonitoringState {
  areas: typeof MOCK_AREAS
  selectedArea: string
  setSelectedArea: (areaId: string) => void
  currentArea: (typeof MOCK_AREAS)[0] | undefined
}

export const useMonitoring = create<MonitoringState>((set, get) => ({
  areas: MOCK_AREAS,
  selectedArea: MOCK_AREAS[0].id,
  setSelectedArea: (areaId) => set({ selectedArea: areaId }),
  currentArea: MOCK_AREAS[0],
}));