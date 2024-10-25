"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_MODELS } from "@/lib/constants/ai-models";
import type { AIModel } from "@/lib/types/ai-model";
import { format } from "date-fns";
import { ModelActions } from "./model-actions";

export function ModelList() {
  const getStatusColor = (status: AIModel["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "training":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
    }
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

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">AI Model Library</h2>
        <Button variant="outline" size="sm">
          Import Model
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_MODELS.map((model) => (
            <TableRow key={model.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {model.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>{model.version}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusColor(model.status)}>
                  {model.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {model.categories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary"
                      className={`cursor-pointer transition-colors ${getCategoryColor(category)}`}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {format(model.updatedAt, "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <ModelActions model={model} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}