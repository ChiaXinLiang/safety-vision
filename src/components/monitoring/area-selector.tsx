"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useMonitoringStore } from "@/store/monitoring"
import { SheetClose } from "@/components/ui/sheet"

export function AreaSelector() {
  const store = useMonitoringStore()
  const [localSelectedIds, setLocalSelectedIds] = React.useState<string[]>(
    store.selectedAreaIds.length > 0 ? store.selectedAreaIds : store.areas.map(area => area.id)
  )

  // Keep local state in sync with store
  React.useEffect(() => {
    setLocalSelectedIds(store.selectedAreaIds)
  }, [store.selectedAreaIds])

  const handleLocalToggle = (id: string) => {
    setLocalSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(areaId => areaId !== id)
        : [...prev, id]
    )
  }

  const handleLocalToggleAll = () => {
    setLocalSelectedIds(prev => 
      prev.length === store.areas.length ? [] : store.areas.map(area => area.id)
    )
  }

  const handleConfirm = () => {
    store.setSelectedAreaIds(localSelectedIds)
  }

  const isLocalAllSelected = localSelectedIds.length === store.areas.length

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all-areas" 
              checked={isLocalAllSelected}
              onCheckedChange={handleLocalToggleAll}
            />
            <label
              htmlFor="all-areas"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              All Area(s)
            </label>
          </div>
          <div className="space-y-2">
            {store.areas.map((area) => (
              <div key={area.id} className="flex items-center space-x-2">
                <Checkbox
                  id={area.id}
                  checked={localSelectedIds.includes(area.id)}
                  onCheckedChange={() => handleLocalToggle(area.id)}
                />
                <label
                  htmlFor={area.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {area.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <SheetClose asChild>
          <Button className="w-full" onClick={handleConfirm}>
            Confirm Selection
          </Button>
        </SheetClose>
      </div>
    </div>
  )
}