import type { Alert } from "@/lib/types/alert";

export const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    type: "safety",
    title: "Safety Behavior",
    message: "Person detected on Zone 2",
    location: "Location A",
    timestamp: new Date(),
    status: "active",
    priority: "high",
  },
  {
    id: "2",
    type: "dangerous",
    title: "Dangerous Situation",
    message: "Smoke detected",
    location: "Location C",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: "active",
    priority: "critical",
  },
  {
    id: "3",
    type: "safety",
    title: "Safety Equipment",
    message: "Missing safety helmet",
    location: "Location B",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "resolved",
    priority: "medium",
    resolvedAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    resolvedBy: "John Doe",
  },
];