"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraViewerProps {
    imageSrc: string;
    alt: string;
}

export function CameraViewer({ imageSrc, alt }: CameraViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            setImage(img);
            drawImage(img);
        };
    }, [imageSrc]);

    const drawImage = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate dimensions to maintain aspect ratio
        const containerAspectRatio = canvas.width / canvas.height;
        const imageAspectRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;

        if (containerAspectRatio > imageAspectRatio) {
            drawWidth = drawHeight * imageAspectRatio;
        } else {
            drawHeight = drawWidth / imageAspectRatio;
        }

        // Center the image
        const x = (canvas.width - drawWidth * zoom) / 2 + position.x;
        const y = (canvas.height - drawHeight * zoom) / 2 + position.y;

        // Draw image with current zoom and position
        ctx.drawImage(img, x, y, drawWidth * zoom, drawHeight * zoom);
    };

    useEffect(() => {
        if (image) drawImage(image);
    }, [zoom, position, image]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.1, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.1, 0.5));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const toggleFullscreen = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (!isFullscreen) {
            if (canvas.requestFullscreen) {
                await canvas.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                width={1920}
                height={1080}
                className="w-full cursor-move rounded-lg bg-black"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm"
                    onClick={handleZoomOut}
                >
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm"
                    onClick={handleZoomIn}
                >
                    <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm"
                    onClick={toggleFullscreen}
                >
                    {isFullscreen ? (
                        <Minimize className="h-4 w-4" />
                    ) : (
                        <Maximize className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    );
}
