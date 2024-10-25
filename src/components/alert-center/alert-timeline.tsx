import { format } from "date-fns";
import type { Alert } from "@/lib/types/alert";

interface AlertTimelineProps {
  alert: Alert
}

export function AlertTimeline({ alert }: AlertTimelineProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium">Timeline</h4>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative">
            <div className="absolute left-1.5 top-2.5 h-full w-px bg-border" />
            <div className="relative z-10 h-4 w-4 rounded-full border-2 border-primary bg-background" />
          </div>
          <div>
            <div className="font-medium">Alert Created</div>
            <div className="text-sm text-muted-foreground">
              {format(alert.timestamp, "PPpp")}
            </div>
          </div>
        </div>

        {alert.status === "resolved" && alert.resolvedAt && (
          <div className="flex gap-4">
            <div className="relative">
              <div className="absolute left-1.5 top-2.5 h-full w-px bg-border" />
              <div className="relative z-10 h-4 w-4 rounded-full border-2 border-green-500 bg-background" />
            </div>
            <div>
              <div className="font-medium">Alert Resolved</div>
              <div className="text-sm text-muted-foreground">
                {format(alert.resolvedAt, "PPpp")}
                {alert.resolvedBy && ` by ${alert.resolvedBy}`}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="relative">
            <div className="h-4 w-4 rounded-full border-2 border-border bg-background" />
          </div>
          <div>
            <div className="font-medium">Current Status</div>
            <div className="text-sm text-muted-foreground">
              Alert is {alert.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}