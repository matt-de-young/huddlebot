import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryProps {
  summary: string;
  loading: boolean;
}

export function Summary({ summary, loading }: SummaryProps) {
  // Get the current date for the status update
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Team Status ({formattedDate})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">{loading ? <Skeleton className="h-6 w-full" /> : <p>{summary}</p>}</div>
      </CardContent>
    </Card>
  );
}
