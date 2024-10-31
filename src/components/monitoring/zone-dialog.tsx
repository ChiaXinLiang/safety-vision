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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { DETECTION_DISPLAY_GROUPS, VIOLATION_TYPES } from "@/lib/constants/zone";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: ZoneFormData) => void;
    initialData?: ZoneFormData;
    mode: "add" | "edit";
}

interface ZoneFormData {
    name: string;
    detectionDisplayGroup: string[];
    violationType: string[];
}

export function ZoneDialog({
    open,
    onOpenChange,
    onSave,
    initialData,
    mode,
}: ZoneDialogProps) {
    const [formData, setFormData] = useState<ZoneFormData>(
        initialData || {
            name: "",
            detectionDisplayGroup: [],
            violationType: [],
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onOpenChange(false);
    };

    const toggleDetectionGroup = (groupId: string) => {
        setFormData(prev => ({
            ...prev,
            detectionDisplayGroup: prev.detectionDisplayGroup.includes(groupId)
                ? prev.detectionDisplayGroup.filter(id => id !== groupId)
                : [...prev.detectionDisplayGroup, groupId]
        }));
    };

    const toggleViolationType = (typeId: string) => {
        setFormData(prev => ({
            ...prev,
            violationType: prev.violationType.includes(typeId)
                ? prev.violationType.filter(id => id !== typeId)
                : [...prev.violationType, typeId]
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {mode === "add" ? "Add New Zone" : "Edit Zone"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-normal">Zone Name:</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="rounded-lg border p-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base font-normal">Detection Display Group:</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between rounded-lg border p-3",
                                        formData.detectionDisplayGroup.length > 0 && "h-auto min-h-[2.5rem]"
                                    )}
                                >
                                    <div className="flex flex-wrap gap-1">
                                        {formData.detectionDisplayGroup.length === 0 ? (
                                            <span>Select groups</span>
                                        ) : (
                                            formData.detectionDisplayGroup.map(groupId => {
                                                const group = DETECTION_DISPLAY_GROUPS.find(g => g.id === groupId);
                                                return (
                                                    <span key={groupId} className="inline-flex rounded-md bg-red-100 px-3 py-1 text-sm">
                                                        {group?.tag}
                                                    </span>
                                                );
                                            })
                                        )}
                                    </div>
                                    <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                                <div className="space-y-2 p-2">
                                    {DETECTION_DISPLAY_GROUPS.map((group) => (
                                        <div key={group.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={group.id}
                                                checked={formData.detectionDisplayGroup.includes(group.id)}
                                                onCheckedChange={() => toggleDetectionGroup(group.id)}
                                            />
                                            <label htmlFor={group.id} className="text-sm">
                                                {group.name}
                                            </label>
                                        </div>
                                    ))}
                                    <div className="mt-2 border-t pt-2 text-sm text-gray-500">
                                        + Add Detection Display Group
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base font-normal">Violation Type:</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between rounded-lg border p-3",
                                        formData.violationType.length > 0 && "h-auto min-h-[2.5rem]"
                                    )}
                                >
                                    <div className="flex flex-wrap gap-1">
                                        {formData.violationType.length === 0 ? (
                                            <span>Select types</span>
                                        ) : (
                                            formData.violationType.map(typeId => {
                                                const type = VIOLATION_TYPES.find(t => t.id === typeId);
                                                return (
                                                    <span key={typeId} className="inline-flex rounded-md bg-yellow-100 px-3 py-1 text-sm">
                                                        {type?.tag}
                                                    </span>
                                                );
                                            })
                                        )}
                                    </div>
                                    <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                                <div className="space-y-2 p-2">
                                    {VIOLATION_TYPES.map((type) => (
                                        <div key={type.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={type.id}
                                                checked={formData.violationType.includes(type.id)}
                                                onCheckedChange={() => toggleViolationType(type.id)}
                                            />
                                            <label htmlFor={type.id} className="text-sm">
                                                {type.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-32 rounded-lg bg-gray-700 text-white"
                        >
                            {mode === "add" ? "Save" : "Save Change"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
