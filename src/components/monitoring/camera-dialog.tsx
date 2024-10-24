"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Camera } from "@/lib/types/monitoring";
import * as React from "react";

interface CameraDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  camera?: Camera
  onSave: (data: Partial<Camera>) => void
}

export function CameraDialog({ open, onOpenChange, camera, onSave }: CameraDialogProps) {
  const [sourceType, setSourceType] = React.useState<"local" | "url">("local");
  const [formData, setFormData] = React.useState({
    name: camera?.name || "",
    type: camera?.type || "main",
    description: "",
    source: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {camera ? "Edit Camera" : "Add New Camera"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="camera-name">Camera Name:</Label>
              <Input
                id="camera-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Camera Type:</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as "main" | "sub" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select camera type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Camera (Panoramic)</SelectItem>
                  <SelectItem value="sub">Sub Camera (PTZ)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description:</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="resize-none"
              />
            </div>

            <div className="space-y-4">
              <Label>Source:</Label>
              <RadioGroup
                value={sourceType}
                onValueChange={(value) => setSourceType(value as "local" | "url")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="local" id="local" />
                  <Label htmlFor="local">Local Device</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">Camera URL</Label>
                </div>
              </RadioGroup>

              {sourceType === "local" ? (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select local device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="device1">Device 1</SelectItem>
                    <SelectItem value="device2">Device 2</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  placeholder="Enter camera URL"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}