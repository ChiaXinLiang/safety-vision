"use client";

import type { TimeRange } from "@/app/media-library/page";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface VideoGridProps {
  timeRange: TimeRange
}

// Generate mock videos within the selected time range
function generateMockVideos(timeRange: TimeRange) {
  const videos = [];
  let currentTime = new Date(timeRange.start);
  
  while (currentTime <= timeRange.end) {
    videos.push({
      id: `video-${currentTime.getTime()}`,
      timestamp: new Date(currentTime),
    });
    // Add 15 minutes for next video
    currentTime = new Date(currentTime.getTime() + 15 * 60000);
  }

  return videos;
}

export function VideoGrid({ timeRange }: VideoGridProps) {
  const router = useRouter();
  const videos = generateMockVideos(timeRange);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div 
          key={video.id} 
          className="space-y-2 cursor-pointer"
          onClick={() => router.push(`/media-library/video/${video.id}`)}
        >
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-90">
            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
              Video
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {format(video.timestamp, "yyyy/MM/dd HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
}