export interface Alert {
  id: string;
  type: "safety" | "dangerous";
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  status: "active" | "resolved" | "pending";
  priority: "low" | "medium" | "high" | "critical";
  assignedTo?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
}
