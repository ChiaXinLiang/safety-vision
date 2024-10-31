"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const MOCK_ALERTS = [
  {
    id: "1",
    message: "Worker without helmet detected in Location C",
    time: "2 min ago",
  },
  {
    id: "2",
    message: "Unauthorized access at Area 2",
    time: "15 min ago",
  },
  {
    id: "3",
    message: "All clear: Safety check completed in Area 2",
    time: "1h ago",
  },
] as const;

export function AlertList() {
  const router = useRouter();

  return (
    <Card>
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Recent Alerts</h2>
        <Button
          variant="link"
          className="text-sm font-medium text-blue-600"
          onClick={() => router.push("/alert-center")}
        >
          Alert Center
        </Button>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300" />
              <div className="space-y-1">
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs text-gray-500">({alert.time})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
