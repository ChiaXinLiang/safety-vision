"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AreaSelector } from "@/components/monitoring/area-selector"
import { useMonitoringStore } from "@/store/monitoring"
import { useRouter } from "next/navigation"

export function PageHeader() {
  const router = useRouter()
  const selectedAreas = useMonitoringStore((state) => state.selectedAreas)

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Real-Time Monitoring</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              {selectedAreas.length === 0
                ? "Select Areas"
                : `${selectedAreas.length} Area${
                    selectedAreas.length === 1 ? "" : "s"
                  } Selected`}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Area Selection</SheetTitle>
            </SheetHeader>
            <AreaSelector />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">Media Library</Button>
        <Button variant="outline">Data Analysis</Button>
        <Button variant="outline" onClick={() => router.push("/area-management")}>
          Area Management
        </Button>
        <Button variant="outline">Setting</Button>
      </div>
    </div>
  )
}