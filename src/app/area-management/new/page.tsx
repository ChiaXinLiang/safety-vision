"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMonitoringStore } from "@/store/monitoring"
import { useState } from "react"

export default function AddNewAreaPage() {
  const router = useRouter()
  const [areaName, setAreaName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add validation and store update logic here
    router.push("/area-management")
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold">Add New Area</h1>

        <form onSubmit={handleSubmit}>
          <Card className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="area-name">Area Name:</Label>
              <Input
                id="area-name"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                placeholder="Enter area name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description:</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter area description"
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="w-full max-w-[200px]"
                disabled={!areaName.trim()}
              >
                Save
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </main>
  )
}