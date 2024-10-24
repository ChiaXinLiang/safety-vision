"use client"

import * as React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { CalendarIcon } from "@radix-ui/react-icons"

type TimeOption = "1h" | "4h" | "8h" | "12h" | "24h" | "custom"

interface VideoExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTime: Date
  onExport: (data: { timeRange: [Date, Date], name: string }) => void
}

export function VideoExportDialog({ 
  open, 
  onOpenChange,
  currentTime,
  onExport 
}: VideoExportDialogProps) {
  const [timeOption, setTimeOption] = React.useState<TimeOption>("custom")
  const [customRange, setCustomRange] = React.useState<[Date, Date]>([
    new Date(currentTime.getTime() - 60 * 60 * 1000), // 1 hour before
    new Date(currentTime)
  ])
  const [exportName, setExportName] = React.useState("")

  // Update time range based on selected option
  React.useEffect(() => {
    if (timeOption === "custom") return

    const hours = parseInt(timeOption)
    const end = new Date(currentTime)
    const start = new Date(currentTime.getTime() - hours * 60 * 60 * 1000)
    setCustomRange([start, end])
  }, [timeOption, currentTime])

  const handleExport = () => {
    onExport({
      timeRange: customRange,
      name: exportName.trim() || "Exported Video"
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <RadioGroup
            value={timeOption}
            onValueChange={(value) => setTimeOption(value as TimeOption)}
            className="grid gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1h" id="1h" />
              <Label htmlFor="1h">Last Hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4h" id="4h" />
              <Label htmlFor="4h">Last 4 Hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="8h" id="8h" />
              <Label htmlFor="8h">Last 8 Hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12h" id="12h" />
              <Label htmlFor="12h">Last 12 Hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24h" id="24h" />
              <Label htmlFor="24h">Last 24 Hours</Label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
              {timeOption === "custom" && (
                <div className="ml-6 mt-2 grid gap-2">
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-2">
                    <CalendarIcon className="h-4 w-4 opacity-70" />
                    <div className="grid flex-1 gap-1 text-sm">
                      <div>
                        {format(customRange[0], "MMM dd, yyyy HH:mm:ss")}
                      </div>
                      <div className="text-center">→</div>
                      <div>
                        {format(customRange[1], "MMM dd, yyyy HH:mm:ss")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="export-name">Name the Export</Label>
            <Input
              id="export-name"
              placeholder="Enter export name"
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport}>Export</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}