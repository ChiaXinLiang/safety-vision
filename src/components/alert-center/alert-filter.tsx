"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMonitoringStore } from "@/store/monitoring";
import { useState } from "react";

interface AlertFilterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ALERT_LABELS = [
  "person",
  "safety helmet",
  "reflective vest",
  "crane",
  "working platform",
  "fire",
  "smoke",
] as const;

type AlertLabel = typeof ALERT_LABELS[number]

export function AlertFilter({ open, onOpenChange }: AlertFilterProps) {
  const areas = useMonitoringStore((state) => state.areas);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<AlertLabel[]>([]);

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => {
      if (prev.includes(areaId)) {
        // When unchecking an area, also uncheck its locations
        const area = areas.find(a => a.id === areaId);
        const locationIds = area?.locations.map(l => l.id) || [];
        setSelectedLocations(prev => 
          prev.filter(id => !locationIds.includes(id))
        );
        return prev.filter(id => id !== areaId);
      } else {
        return [...prev, areaId];
      }
    });
  };

  const handleLocationToggle = (locationId: string, areaId: string) => {
    setSelectedLocations(prev => {
      const newLocations = prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId];
      
      // Check if all locations of an area are selected
      const area = areas.find(a => a.id === areaId);
      const areaLocationIds = area?.locations.map(l => l.id) || [];
      const allLocationsSelected = areaLocationIds.every(id => 
        newLocations.includes(id)
      );

      // Update area selection accordingly
      if (allLocationsSelected && !selectedAreas.includes(areaId)) {
        setSelectedAreas(prev => [...prev, areaId]);
      } else if (!allLocationsSelected && selectedAreas.includes(areaId)) {
        setSelectedAreas(prev => prev.filter(id => id !== areaId));
      }

      return newLocations;
    });
  };

  const handleLabelToggle = (label: AlertLabel) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({
      areas: selectedAreas,
      locations: selectedLocations,
      labels: selectedLabels,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Alerts</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Areas and Locations */}
          <div className="space-y-4">
            <Label>Select Area(s) / Location(s):</Label>
            <Card className="p-4">
              <div className="space-y-4">
                {areas.map((area) => (
                  <div key={area.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={area.id}
                        checked={selectedAreas.includes(area.id)}
                        onCheckedChange={() => handleAreaToggle(area.id)}
                      />
                      <Label htmlFor={area.id}>{area.name}</Label>
                    </div>
                    <div className="ml-6 grid grid-cols-2 gap-2">
                      {area.locations.map((location) => (
                        <div key={location.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={location.id}
                            checked={selectedLocations.includes(location.id)}
                            onCheckedChange={() => handleLocationToggle(location.id, area.id)}
                          />
                          <Label htmlFor={location.id}>{location.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Separator />

          {/* Labels */}
          <div className="space-y-4">
            <Label>Select Label(s):</Label>
            <Card className="p-4">
              <div className="grid gap-2">
                {ALERT_LABELS.map((label) => (
                  <div key={label} className="flex items-center space-x-2">
                    <Checkbox
                      id={`label-${label}`}
                      checked={selectedLabels.includes(label)}
                      onCheckedChange={() => handleLabelToggle(label)}
                    />
                    <Label htmlFor={`label-${label}`}>{label}</Label>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Change
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}