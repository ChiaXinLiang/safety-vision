"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { VideoTimeline } from "@/components/media-library/video-timeline"
import { VideoPlayer } from "@/components/media-library/video-player"
import { VideoExportDialog } from "@/components/media-library/video-export-dialog"
import { ArrowLeftIcon, CalendarIcon, DownloadIcon, MixerHorizontalIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export default function VideoPlayerPage() {
  const router = useRouter()
  const { id } = useParams()
  const [currentTime, setCurrentTime] = useState<Date>(new Date(2024, 0, 24, 11, 30))
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  const handleExport = (data: { timeRange: [Date, Date], name: string }) => {
    // Handle export logic here
    console.log("Exporting video:", data)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setExportDialogOpen(true)}
          >
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Date
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <MixerHorizontalIcon className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid h-[calc(100vh-49px)] grid-cols-[60px_1fr]">
        <VideoTimeline currentTime={currentTime} onTimeChange={setCurrentTime} />
        <VideoPlayer currentTime={currentTime} />
      </div>

      <VideoExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        currentTime={currentTime}
        onExport={handleExport}
      />
    </main>
  )
}