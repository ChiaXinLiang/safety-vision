"use client";

import { useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";

export interface CameraViewerProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CameraViewer({
  src,
  width = 640,
  height = 480,
  className,
}: CameraViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (canvas && image) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratios
        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        // Adjust dimensions to maintain aspect ratio
        if (imageAspectRatio > canvasAspectRatio) {
          drawHeight = canvas.width / imageAspectRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imageAspectRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    imageRef.current = image;

    image.onload = drawImage;
  }, [src, drawImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      drawImage();
    }
  }, [width, height, drawImage]);

  return (
    <Card className={className}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </Card>
  );
}
