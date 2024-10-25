import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Alert } from "@/lib/types/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

interface AlertCardProps {
  alert: Alert
  onViewDetails: (alert: Alert) => void
}

export function AlertCard({ alert, onViewDetails }: AlertCardProps) {
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
    <Card className="overflow-hidden">
      <div className="flex items-start gap-4 border-b p-4">
        <div className={`mt-1 rounded-full p-1 ${getPriorityColor(alert.priority)}`}>
          <ExclamationTriangleIcon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="font-medium">{alert.title}</h3>
            <p className="text-sm text-muted-foreground">
              {alert.message} in {alert.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(alert)}
            >
              View Details
            </Button>
            {alert.type === "safety" ? (
              <Button variant="outline" size="sm">
                Notify Supervisor
              </Button>
            ) : (
              <Button variant="outline" size="sm">
                Send Safety Reminder
              </Button>
            )}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(alert.timestamp, "HH:mm")}
        </div>
      </div>
    </Card>
  );
}