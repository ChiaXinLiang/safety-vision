"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings and Configuration</h1>
        <Button variant="secondary">Instruction manual</Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => router.push("/settings/ai-models")}
        >
          AI Model Management
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/settings/detection-management")}
        >
          Detection and Violation Management
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/settings/whitelist-management")}
        >
          Whitelist / Blacklist Management
        </Button>
      </div>

      {/* Rest of the settings page content... */}
    </main>
  );
}
