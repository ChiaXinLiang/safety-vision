import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LocationCard } from "./location-card"
import { useRouter } from "next/navigation"
import type { Area } from "@/lib/types/monitoring"

interface AreaCardProps {
  area: Area
}

export function AreaCard({ area }: AreaCardProps) {
  const router = useRouter()

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">{area.name}</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push(`/area-management/${area.id}`)}
        >
          Edit Area
        </Button>
      </div>
      <div className="space-y-6 p-6">
        {area.locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </Card>
  )
}