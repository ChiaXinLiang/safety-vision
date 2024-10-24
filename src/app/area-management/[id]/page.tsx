"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useMonitoringStore } from "@/store/monitoring";
import { useParams, useRouter } from "next/navigation";

export default function EditAreaPage() {
  const { id } = useParams();
  const router = useRouter();
  const areas = useMonitoringStore((state) => state.areas);
  const area = areas.find((a) => a.id === id);

  if (!area) {
    return <div>Area not found</div>;
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-gray-50/40 p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-semibold">Edit Area - {area.name}</h1>

      <div className="space-y-6">
        <div className="rounded-lg bg-gray-200 p-4">
          <Textarea
            placeholder="Area Description."
            className="min-h-[100px] resize-none bg-transparent"
            defaultValue={area.description}
          />
        </div>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-medium">Location</h2>
            <Button>Add New Location</Button>
          </div>

          {area.locations.map((location) => (
            <div
              key={location.id}
              className="flex items-center justify-between border-b p-4 last:border-0"
            >
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {location.cameras.length} cameras (
                  {location.cameras.filter((c) => c.type === "main").length}{" "}
                  Panoramic,{" "}
                  {location.cameras.filter((c) => c.type === "sub").length} PTZ)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => router.push(`/area-management/${area.id}/location/${location.id}`)}
                >
                  Edit Location
                </Button>
                <Button variant="ghost" className="text-destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </main>
  );
}