"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useMonitoringStore } from "@/store/monitoring"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function AreaSelector() {
  const areas = useMonitoringStore((state) => state.areas)
  const [selectedAreas, setSelectedAreas] = useState<string[]>(areas.map(a => a.id))
  const [isAllSelected, setIsAllSelected] = useState(true)

  const handleAllAreasToggle = () => {
    if (isAllSelected) {
      setSelectedAreas([])
      setIsAllSelected(false)
    } else {
      setSelectedAreas(areas.map(a => a.id))
      setIsAllSelected(true)
    }
  }

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => {
      const newSelection = prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
      
      setIsAllSelected(newSelection.length === areas.length)
      return newSelection
    })
  }

  const handleReset = () => {
    setSelectedAreas(areas.map(a => a.id))
    setIsAllSelected(true)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[180px]">
          {isAllSelected 
            ? "All Areas" 
            : `${selectedAreas.length} Area${selectedAreas.length === 1 ? '' : 's'}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">All Areas</span>
            <Switch 
              checked={isAllSelected}
              onCheckedChange={handleAllAreasToggle}
            />
          </div>
          <div className="space-y-2">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center justify-between">
                <span className="text-sm">{area.name}</span>
                <Switch
                  checked={selectedAreas.includes(area.id)}
                  onCheckedChange={() => handleAreaToggle(area.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2">
            <Button 
              variant="default" 
              className="w-[100px]"
              onClick={() => console.log("Applied:", selectedAreas)}
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
      </PopoverContent>
    </Popover>
  )
}