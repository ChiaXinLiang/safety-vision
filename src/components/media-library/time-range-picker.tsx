"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface TimeRange {
  start: Date;
  end: Date;
}

interface TimeRangePickerProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  className?: string;
}

export function TimeRangePicker({
  value,
  onChange,
  className,
}: TimeRangePickerProps) {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (isStartDateOpen) {
      onChange({
        start: date,
        end: date > value.end ? date : value.end,
      });
      setIsStartDateOpen(false);
    } else if (isEndDateOpen) {
      onChange({
        start: date < value.start ? date : value.start,
        end: date,
      });
      setIsEndDateOpen(false);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value.start && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value.start ? (
              format(value.start, "PPP")
            ) : (
              <span>Pick a start date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value.start}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>

      <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value.end && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value.end ? format(value.end, "PPP") : <span>Pick an end date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value.end}
            onSelect={handleDateSelect}
            disabled={(date) =>
              date < value.start || date > new Date()
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
