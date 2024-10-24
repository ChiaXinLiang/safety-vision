"use client"

import { AreaCard } from "./area-card"
import { AlertList } from "./alert-list"
import { useMonitoringStore } from "@/store/monitoring"

export function MonitoringDashboard() {
  const selectedAreas = useMonitoringStore((state) => state.selectedAreas)

  if (selectedAreas.length === 0) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No areas selected. Please select at least one area to view monitoring data.
        </div>
        <AlertList />
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        {selectedAreas.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </div>
      <AlertList />
    </div>
  )
}