"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModelCategorySchema } from "@/lib/types/ai-model";
import { useState } from "react";

interface AddModelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddModelDialog({ open, onOpenChange }: AddModelDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: [] as string[],
  });

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "safety helmet":
      case "safety shoe":
      case "reflective vest":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "crane":
      case "working platform":
      case "step ladder":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "fire":
      case "smoke":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log("New model:", formData);
    onOpenChange(false);
    setFormData({ name: "", description: "", categories: [] }); // Reset form
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Model</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter model name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter model description"
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2 rounded-lg border p-4">
              {ModelCategorySchema.options.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className={`cursor-pointer transition-colors ${getCategoryColor(category)} ${
                    formData.categories.includes(category)
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}