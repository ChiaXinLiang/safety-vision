import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="space-y-6 p-6">
              {[1, 2].map((j) => (
                <div key={j} className="rounded-lg bg-[#40B7CB] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <div className="grid gap-4">
                      <Skeleton className="aspect-video w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex items-center justify-between border-b p-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="mt-2 h-1.5 w-1.5 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}