"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MonitoringLocation } from "./location";
import type { Camera } from "@/lib/types/camera";

interface MonitoringAreaProps {
  area: {
    id: string;
    name: string;
    locations: {
      id: string;
      name: string;
      cameras: Camera[];
    }[];
  };
}

export function MonitoringArea({ area }: MonitoringAreaProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">{area.name}</h2>
        <Button variant="outline" size="sm">
          Edit Area
        </Button>
      </div>
      <div className="space-y-6 p-6">
        {area.locations.map((location) => (
          <MonitoringLocation key={location.id} location={location} />
        ))}
      </div>
    </Card>
  );
}
