"use client";

import { useRef } from "react";

interface VideoTimelineProps {
  currentTime: Date
  onTimeChange: (time: Date) => void
}

export function VideoTimeline({ currentTime, onTimeChange }: VideoTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle timeline click/drag
  const handleTimelineInteraction = (clientY: number) => {
    if (!containerRef.current) return;

    const { top, height } = containerRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientY - top) / height));
    
    // Convert percentage to time (assuming 24-hour range)
    const hours = Math.floor(percentage * 24);
    const minutes = Math.floor((percentage * 24 * 60) % 60);
    
    const newTime = new Date(currentTime);
    newTime.setHours(hours, minutes);
    onTimeChange(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleTimelineInteraction(e.clientY);

    const handleMouseMove = (e: MouseEvent) => {
      handleTimelineInteraction(e.clientY);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Calculate current time position
  const timePercentage = (currentTime.getHours() * 60 + currentTime.getMinutes()) / (24 * 60);

  return (
    <div className="relative border-r bg-black p-2" ref={containerRef}>
      <div 
        className="absolute inset-y-0 right-2 w-2 cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Time markers */}
        <div className="relative h-full">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute right-3 text-[10px] text-gray-400"
              style={{ top: `${(i * 100) / 24}%` }}
            >
              {String(i).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Timeline track */}
        <div className="h-full w-full rounded bg-red-500/10">
          {/* Current time indicator */}
          <div 
            className="absolute right-0 h-4 w-2 -translate-y-1/2 rounded bg-red-500"
            style={{ top: `${timePercentage * 100}%` }}
          />

          {/* Activity indicators */}
          <div 
            className="absolute right-0 w-2 rounded bg-red-500/50"
            style={{ 
              top: "45%",
              height: "15%"
            }}
          />
        </div>
      </div>
    </div>
  );
}