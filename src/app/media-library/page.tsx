"use client";

import { AreaSelector } from "@/components/media-library/area-selector";
import { TimeRangePicker } from "@/components/media-library/time-range-picker";
import { VideoFilter } from "@/components/media-library/video-filter";
import { VideoGrid } from "@/components/media-library/video-grid";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export type TimeRange = {
  start: Date
  end: Date
}

export default function MediaLibraryPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start: new Date(2024, 0, 24, 11, 0), // 11:00
    end: new Date(2024, 0, 24, 12, 0),   // 12:00
  });
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-semibold">Media Library</h1>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Button variant="outline" className="w-32">
          Alerts
        </Button>
        <Button variant="outline" className="w-32">
          Detection
        </Button>
        <div className="flex-1" />
        <AreaSelector />
        <TimeRangePicker value={timeRange} onChange={setTimeRange} />
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <VideoFilter onApply={() => setFilterOpen(false)} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_60px]">
        <VideoGrid timeRange={timeRange} />
        <div className="relative hidden md:block">
          <div className="sticky top-4 h-[calc(100vh-6rem)] w-full rounded-lg bg-black">
            <div className="absolute inset-y-0 right-2 w-2">
              <div className="h-full w-full rounded bg-red-500/10">
                <div className="relative h-full w-full">
                  {/* Time markers */}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute right-3 text-xs text-gray-400"
                      style={{ top: `${(i * 100) / 24}%` }}
                    >
                      {String(i).padStart(2, "0")}:00
                    </div>
                  ))}
                  {/* Activity indicator */}
                  <div
                    className="absolute right-0 w-2 rounded bg-red-500"
                    style={{ 
                      top: `${(timeRange.start.getHours() * 100) / 24}%`,
                      height: `${((timeRange.end.getHours() - timeRange.start.getHours()) * 100) / 24}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}