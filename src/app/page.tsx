import { Suspense } from "react"
import { MonitoringDashboard } from "@/components/monitoring/dashboard"
import { PageHeader } from "@/components/page-header"
import { DashboardSkeleton } from "@/components/monitoring/dashboard-skeleton"

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 md:p-6">
      <PageHeader />
      <Suspense fallback={<DashboardSkeleton />}>
        <MonitoringDashboard />
      </Suspense>
    </main>
  )
}