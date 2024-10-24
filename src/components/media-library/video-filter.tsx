"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface VideoFilterProps {
  onApply: () => void
}

export function VideoFilter({ onApply }: VideoFilterProps) {
  const [filters, setFilters] = useState({
    allLabels: true,
    person: true,
    crane: true,
    allZoneTypes: true,
    zoneType1: true,
    zoneType2: true,
  })

  const handleLabelToggle = (key: keyof typeof filters) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: !prev[key] }
      
      // Handle "All Labels" logic
      if (key === "allLabels") {
        newFilters.person = !prev.allLabels
        newFilters.crane = !prev.allLabels
      } else if (key === "person" || key === "crane") {
        newFilters.allLabels = newFilters.person && newFilters.crane
      }

      // Handle "All Zone Types" logic
      if (key === "allZoneTypes") {
        newFilters.zoneType1 = !prev.allZoneTypes
        newFilters.zoneType2 = !prev.allZoneTypes
      } else if (key === "zoneType1" || key === "zoneType2") {
        newFilters.allZoneTypes = newFilters.zoneType1 && newFilters.zoneType2
      }

      return newFilters
    })
  }

  const handleReset = () => {
    setFilters({
      allLabels: true,
      person: true,
      crane: true,
      allZoneTypes: true,
      zoneType1: true,
      zoneType2: true,
    })
  }

  return (
    <div className="space-y-6 p-4">
      {/* Labels Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-input bg-background px-3 py-2">
          <span className="text-lg font-medium">All Labels</span>
          <Switch 
            checked={filters.allLabels}
            onCheckedChange={() => handleLabelToggle("allLabels")}
          />
        </div>
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between">
            <span className="text-base">person</span>
            <Switch
              checked={filters.person}
              onCheckedChange={() => handleLabelToggle("person")}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base">crane</span>
            <Switch
              checked={filters.crane}
              onCheckedChange={() => handleLabelToggle("crane")}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Zone Types Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-input bg-background px-3 py-2">
          <span className="text-lg font-medium">All Zone Type</span>
          <Switch 
            checked={filters.allZoneTypes}
            onCheckedChange={() => handleLabelToggle("allZoneTypes")}
          />
        </div>
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between">
            <span className="text-base">Zone Type 1</span>
            <Switch
              checked={filters.zoneType1}
              onCheckedChange={() => handleLabelToggle("zoneType1")}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base">Zone Type 2</span>
            <Switch
              checked={filters.zoneType2}
              onCheckedChange={() => handleLabelToggle("zoneType2")}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          className="w-[100px]"
          onClick={onApply}
        >
          Apply
        </Button>
        <Button 
          variant="outline" 
          className="w-[100px]"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}