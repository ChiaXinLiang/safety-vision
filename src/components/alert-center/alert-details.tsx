"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Alert } from "@/lib/types/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AlertTimeline } from "./alert-timeline";

interface AlertDetailsProps {
  alert: Alert | null
  onClose: () => void
}

export function AlertDetails({ alert, onClose }: AlertDetailsProps) {
  if (!alert) return null;

  const getPriorityColor = (priority: Alert["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-600";
      case "high":
        return "bg-orange-100 text-orange-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Dialog open={!!alert} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alert Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`mt-1 rounded-full p-1 ${getPriorityColor(alert.priority)}`}>
              <ExclamationTriangleIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">{alert.title}</h3>
              <p className="text-sm text-muted-foreground">
                {alert.message} in {alert.location}
              </p>
            </div>
          </div>

          <AlertTimeline alert={alert} />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {alert.status !== "resolved" && (
              <Button>Take Action</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}