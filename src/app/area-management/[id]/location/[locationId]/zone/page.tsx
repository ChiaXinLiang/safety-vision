"use client";

import CameraViewer from "@/components/monitoring/camera-viewer";
import { ZoneDialog } from "@/components/monitoring/zone-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMonitoringStore } from "@/store/monitoring";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { Zone } from "@/lib/types/zone";

export default function ZoneSettingPage() {
    const { id, locationId } = useParams();
    const areas = useMonitoringStore((state) => state.areas);
    const addZone = useMonitoringStore((state) => state.addZone);
    const updateZone = useMonitoringStore((state) => state.updateZone);
    const deleteZone = useMonitoringStore((state) => state.deleteZone);

    const area = areas.find(a => a.id === id);
    const location = area?.locations.find(l => l.id === locationId);
    const mainCamera = location?.cameras.find(c => c.type === "main");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingZone, setEditingZone] = useState<string | null>(null);

    if (!area || !location || !mainCamera) {
        return <div>Location not found</div>;
    }

    const handleAddZone = () => {
        setEditingZone(null);
        setDialogOpen(true);
    };

    const handleEditZone = (zoneId: string) => {
        setEditingZone(zoneId);
        setDialogOpen(true);
    };

    const handleSaveZone = (data: Omit<Zone, "id">) => {
        if (editingZone) {
            updateZone(area.id, location.id, editingZone, data);
        } else {
            addZone(area.id, location.id, data);
        }
        setDialogOpen(false);
    };

    const handleDeleteZone = (zoneId: string) => {
        deleteZone(area.id, location.id, zoneId);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-2xl font-semibold">
                Zone Setting - {location.name}
            </h1>

            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Main Camera View */}
                <div className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <CameraViewer
                            src={mainCamera.views.raw}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* Zone Management Panel */}
                <Card className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Zone Management</h2>
                        <Button size="sm" className="gap-1" onClick={handleAddZone}>
                            <Plus className="h-4 w-4" />
                            Add Zone
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {location.zones.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                                No zones created yet. Click &ldquo;Add Zone&rdquo; to create one.
                            </div>
                        ) : (
                            location.zones.map((zone) => (
                                <div
                                    key={zone.id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <span className="font-medium">{zone.name}</span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleEditZone(zone.id)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive"
                                            onClick={() => handleDeleteZone(zone.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>

            <ZoneDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={handleSaveZone}
                mode={editingZone ? "edit" : "add"}
                initialData={editingZone ? {
                    name: location.zones.find(z => z.id === editingZone)?.name || "",
                    detectionDisplayGroup: location.zones.find(z => z.id === editingZone)?.detectionDisplayGroup || [],
                    violationType: location.zones.find(z => z.id === editingZone)?.violationType || [],
                } : undefined}
            />
        </div>
    );
}
