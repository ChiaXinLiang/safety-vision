"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function DetectionManagementPage() {
  return (
    <main className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Detection and Violation Management</h1>
        <Button variant="outline">Back to Settings</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Detection Rules */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Detection Rules</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Safety Helmet Detection</h3>
                <p className="text-sm text-muted-foreground">Detect workers without safety helmets</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Safety Vest Detection</h3>
                <p className="text-sm text-muted-foreground">Detect workers without safety vests</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Restricted Area Access</h3>
                <p className="text-sm text-muted-foreground">Detect unauthorized access</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Violation Thresholds */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Violation Thresholds</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Confidence Threshold (%)</label>
              <Input type="number" placeholder="90" />
              <p className="mt-1 text-sm text-muted-foreground">Minimum confidence score for detection</p>
            </div>
            <div>
              <label className="mb-2 block text-sm">Alert Delay (seconds)</label>
              <Input type="number" placeholder="5" />
              <p className="mt-1 text-sm text-muted-foreground">Time before triggering an alert</p>
            </div>
          </div>
        </Card>

        {/* Alert Configuration */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Alert Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Alert Priority</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm">Notification Method</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch /> <span>Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch /> <span>SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch /> <span>In-App Notification</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
