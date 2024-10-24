"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Location } from "@/lib/types/monitoring";

interface LocationFormProps {
  location: Location
}

export function LocationForm({ location }: LocationFormProps) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="grid gap-2">
          <Label htmlFor={`location-${location.id}-name`}>Location Name</Label>
          <Input
            id={`location-${location.id}-name`}
            defaultValue={location.name}
            className="w-[300px]"
          />
        </div>
        <Button variant="outline" className="text-destructive">
          Remove Location
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Cameras</h4>
        <div className="grid gap-4">
          {location.cameras.map((camera) => (
            <div
              key={camera.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor={`camera-${camera.id}-name`}>Camera Name</Label>
                <Input
                  id={`camera-${camera.id}-name`}
                  defaultValue={camera.name}
                  className="w-[300px]"
                />
              </div>
              <div className="grid gap-2">
                <Label>Camera Type</Label>
                <div className="text-sm text-muted-foreground">
                  {camera.type === "main" ? "Panoramic" : "PTZ"}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="self-end text-destructive"
              >
                Remove Camera
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Add Camera
        </Button>
      </div>
    </Card>
  );
}