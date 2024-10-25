"use client";

import { AlertFilter } from "@/components/alert-center/alert-filter";
import { AlertList } from "@/components/alert-center/alert-list";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function AlertCenterPage() {
  const [autoNotification, setAutoNotification] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Alert Center</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and respond to safety alerts in real-time
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="auto-notification"
              checked={autoNotification}
              onCheckedChange={setAutoNotification}
            />
            <label 
              htmlFor="auto-notification" 
              className="text-sm cursor-pointer"
            >
              Auto Notification
            </label>
          </div>
          <Button variant="outline" onClick={() => setFilterOpen(true)}>
            Filter Alerts
          </Button>
        </div>
      </div>

      <AlertList />

      <AlertFilter 
        open={filterOpen}
        onOpenChange={setFilterOpen}
      />
    </main>
  );
}