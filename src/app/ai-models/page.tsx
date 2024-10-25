"use client";

import { AddModelDialog } from "@/components/ai-models/add-model-dialog";
import { ModelList } from "@/components/ai-models/model-list";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AIModelsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">AI Models Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your AI models for safety detection
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>Add Model</Button>
      </div>

      <ModelList />

      <AddModelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </main>
  );
}