"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useMonitoringStore } from "@/store/monitoring"

export default function AreaManagementPage() {
  const router = useRouter()
  const areas = useMonitoringStore((state) => state.areas)

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-gray-50/40 p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-semibold">Area Management</h1>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Area</h2>
          <Button onClick={() => router.push("/area-management/new")}>
            Add New Area
          </Button>
        </div>
        {areas.map((area) => (
          <div
            key={area.id}
            className="flex items-center justify-between border-b p-4 last:border-0"
          >
            <div>
              <h3 className="font-medium">{area.name}</h3>
              <p className="text-sm text-muted-foreground">
                {area.locations.reduce(
                  (acc, location) => acc + location.cameras.length,
                  0
                )}{" "}
                cameras ({area.locations.reduce(
                  (acc, location) =>
                    acc +
                    location.cameras.filter((c) => c.type === "main").length,
                  0
                )}{" "}
                Panoramic,{" "}
                {area.locations.reduce(
                  (acc, location) =>
                    acc + location.cameras.filter((c) => c.type === "sub").length,
                  0
                )}{" "}
                PTZ)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push(`/area-management/${area.id}`)}
              >
                Edit Area
              </Button>
              <Button variant="ghost" className="text-destructive">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </main>
  )
}