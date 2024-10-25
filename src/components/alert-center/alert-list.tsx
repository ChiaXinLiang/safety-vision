"use client";

import { MOCK_ALERTS } from "@/lib/constants/alerts";
import type { Alert } from "@/lib/types/alert";
import { useState } from "react";
import { AlertCard } from "./alert-card";
import { AlertDetails } from "./alert-details";

export function AlertList() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  return (
    <div className="grid gap-4">
      {MOCK_ALERTS.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          onViewDetails={setSelectedAlert}
        />
      ))}

      <AlertDetails
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}