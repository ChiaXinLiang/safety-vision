"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Area } from "@/lib/types/area";
import { useRouter } from "next/navigation";
import { LocationCard } from "./location-card";

interface AreaCardProps {
  area: Area;
}

export function AreaCard({ area }: AreaCardProps) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">{area.name}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/area-management/${area.id}`)}
        >
          Edit Area
        </Button>
      </div>
      <div className="space-y-6 p-6">
        {area.locations.map((location) => (
          <LocationCard
            key={location.id}
            areaId={area.id}
            location={location}
          />
        ))}
      </div>
    </Card>
  );
}
