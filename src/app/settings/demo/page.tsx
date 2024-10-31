"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { UploadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const labels = [
  { id: "person", label: "person" },
  { id: "safety_helmet", label: "safety helmet" },
  { id: "crane", label: "crane" },
  { id: "fire", label: "fire" },
  { id: "smoke", label: "smoke" },
];

export default function DemoPage() {
  const router = useRouter();
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResults("Sample detection results:\n- Person detected (confidence: 0.95)\n- Safety helmet missing (confidence: 0.87)");
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Demo Mode</h1>
        <Button variant="outline" onClick={() => router.push("/settings")}>
          Back to Settings
        </Button>
      </div>

      <Card className="p-6">
        {/* Upload Area */}
        <div
          className={cn(
            "mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12",
            isDragging ? "border-primary bg-primary/10" : "border-border",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadIcon className="mb-4 h-8 w-8 text-muted-foreground" />
          <p className="mb-2 text-center text-muted-foreground">
            Drag and drop your video or photo here
          </p>
          <Button variant="secondary" onClick={() => document.getElementById("file-upload")?.click()}>
            Or click to upload
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*,video/*"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
        </div>

        {/* Label Selection */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold">Select Label(s)</h2>
          <div className="flex flex-wrap gap-4">
            {labels.map((label) => (
              <div key={label.id} className="flex items-center space-x-2">
                <Checkbox
                  id={label.id}
                  checked={selectedLabels.includes(label.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLabels([...selectedLabels, label.id]);
                    } else {
                      setSelectedLabels(selectedLabels.filter((id) => id !== label.id));
                    }
                  }}
                />
                <label htmlFor={label.id} className="text-sm font-medium">
                  {label.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Start Demo Button */}
        <Button
          className="mb-6 w-full"
          disabled={selectedLabels.length === 0 || isProcessing}
        >
          Start Demo
        </Button>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">Processing</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Analysis Results */}
        {results && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Analysis Results</h2>
            <div className="rounded-lg bg-muted p-4">
              <pre className="whitespace-pre-wrap text-sm">{results}</pre>
            </div>
            <Button variant="secondary">
              Download Results
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
}
