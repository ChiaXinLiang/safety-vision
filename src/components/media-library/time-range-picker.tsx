"use client";

import type { TimeRange } from "@/app/media-library/page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";

interface TimeRangePickerProps {
  value: TimeRange
  onChange: (range: TimeRange) => void
}

export function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTimeRange = (range: TimeRange) => {
    return `${format(range.start, "yyyy/MM/dd HH:mm")} - ${format(range.end, "HH:mm")}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Keep the same hours but update the date
    const newStart = new Date(date);
    newStart.setHours(value.start.getHours(), value.start.getMinutes());
    
    const newEnd = new Date(date);
    newEnd.setHours(value.end.getHours(), value.end.getMinutes());

    onChange({ start: newStart, end: newEnd });
  };

  const handleTimeChange = (type: "start" | "end", timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const newDate = new Date(type === "start" ? value.start : value.end);
    newDate.setHours(hours, minutes);
    
    onChange({
      ...value,
      [type]: newDate
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatTimeRange(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <div className="mb-4 grid gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <input
                  type="time"
                  value={format(value.start, "HH:mm")}
                  onChange={(e) => handleTimeChange("start", e.target.value)}
                  className="mt-1 w-full rounded-md border px-2 py-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Time</label>
                <input
                  type="time"
                  value={format(value.end, "HH:mm")}
                  onChange={(e) => handleTimeChange("end", e.target.value)}
                  className="mt-1 w-full rounded-md border px-2 py-1"
                />
              </div>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={value.start}
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}