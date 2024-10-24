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
            name: "Camera 1 (Main Camera)",
            type: "main",
            lastIncident: "2h ago",
          },
          {
            id: "camera2",
            name: "Camera 2",
            type: "sub",
            lastIncident: "2h ago",
          },
          {
            id: "camera3",
            name: "Camera 3",
            type: "sub",
            lastIncident: "2h ago",
          },
        ],
      },
      {
        id: "locationB",
        name: "Location B",
        cameras: [
          {
            id: "camera4",
            name: "Camera 4 (Main Camera)",
            type: "main",
            lastIncident: "2h ago",
          },
          {
            id: "camera5",
            name: "Camera 5",
            type: "sub",
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
            id: "camera6",
            name: "Camera 6 (Main Camera)",
            type: "main",
            lastIncident: "2h ago",
          },
          {
            id: "camera7",
            name: "Camera 7",
            type: "sub",
            lastIncident: "2h ago",
          },
        ],
      },
      {
        id: "locationD",
        name: "Location D",
        cameras: [
          {
            id: "camera8",
            name: "Camera 8 (Main Camera)",
            type: "main",
            lastIncident: "2h ago",
          },
          {
            id: "camera9",
            name: "Camera 9",
            type: "sub",
            lastIncident: "2h ago",
          },
          {
            id: "camera10",
            name: "Camera 10",
            type: "sub",
            lastIncident: "2h ago",
          },
          {
            id: "camera11",
            name: "Camera 11",
            type: "sub",
            lastIncident: "2h ago",
          },
        ],
      },
    ],
  },
] as const;