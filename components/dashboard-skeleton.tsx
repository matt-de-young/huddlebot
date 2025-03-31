import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Summary card skeleton */}
      <Card className="mb-6 overflow-hidden relative">
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-48 ui-skeleton" />
          <Skeleton className="h-4 w-full ui-skeleton" />
          <Skeleton className="h-4 w-full ui-skeleton" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <Skeleton className="h-12 w-full ui-skeleton" />
            <Skeleton className="h-12 w-full ui-skeleton" />
            <Skeleton className="h-12 w-full ui-skeleton" />
          </div>
        </div>
        {/* Add a loading indicator overlay for extra visibility */}
        <div className="absolute inset-0 skeleton-shine" />
      </Card>

      {/* Activity header and filters skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-36 ui-skeleton" />
        <Skeleton className="h-10 w-[300px] ui-skeleton" />
      </div>

      {/* Activity cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="overflow-hidden relative">
              <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-full ui-skeleton" />
                <Skeleton className="h-4 w-3/4 ui-skeleton" />
                <Skeleton className="h-16 w-full ui-skeleton" />
                <Skeleton className="h-4 w-24 ui-skeleton" />
              </div>
              {/* Add a loading indicator overlay */}
              <div className="absolute inset-0 skeleton-shine" />
            </Card>
          ))}
      </div>
    </div>
  );
}
