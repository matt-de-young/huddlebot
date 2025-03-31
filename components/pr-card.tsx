import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, AlertCircle, Clock, GitBranch, GitPullRequest } from "lucide-react";
import type { WorkPR, Reviewer } from "@huddlekit/types";

export function PRCard({ pr }: { pr: WorkPR }) {
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500";
      case "In Review":
        return "text-purple-500";
      case "Blocked":
        return "text-red-500";
      case "Open":
        return "text-green-500";
      case "Changes Requested":
        return "text-amber-500";
      case "Draft":
        return "text-slate-500";
      default:
        return "text-gray-500";
    }
  };

  // Get reviewer status icon
  const getReviewerStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "changes_requested":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "requested":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <GitPullRequest className={`h-4 w-4 text-purple-500 ${getStatusColor(pr.status)}`} />
            <CardTitle className="text-base">{pr.title}</CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2">
          <span>#{pr.id}</span>
          <span>•</span>
          <span>{pr.status}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <GitBranch className="h-3 w-3" />
          <span className="font-mono">{pr.branch}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={pr.author.avatar} alt={pr.author.name} />
              <AvatarFallback>{pr.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{pr.author.name}</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">{pr.changes}</span>
        </div>
        {pr.reviewers.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {pr.reviewers.map((reviewer: Reviewer, index: number) => (
              <div key={index} className="flex items-center" title={`${reviewer.name}: ${reviewer.status}`}>
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                  <AvatarFallback>{reviewer.initials}</AvatarFallback>
                </Avatar>
                {getReviewerStatusIcon(reviewer.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 mr-1" />
        {pr.lastUpdated === 0
          ? "Updated today"
          : pr.lastUpdated === 1
            ? "Updated yesterday"
            : `Updated ${pr.lastUpdated} days ago`}
      </CardFooter>
    </Card>
  );
}
