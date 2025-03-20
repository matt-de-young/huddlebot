import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WorkItemUnion } from "@/types/work-items"
import { BarChart2, TrendingUp, AlertCircle, Clock } from "lucide-react"

export function Summary({ workItems, personFilter }: {workItems: WorkItemUnion[], personFilter: string}) {
  // Count statistics
  const totalIssues = workItems.filter(item => item.type === "issue").length
  const totalPRs = workItems.filter(item => item.type === "pr").length

  const issuesInProgress = workItems.filter(
    item => item.type === "issue" && item.status === "In Progress"
  ).length

  const issuesInReview = workItems.filter(
    item => item.type === "issue" && item.status === "In Review"
  ).length

  const issuesBlocked = workItems.filter(
    item => item.type === "issue" && item.status === "Blocked"
  ).length

  const prsNeedingReview = workItems.filter(
    item => item.type === "pr" && (item.status === "Open" || item.status === "Changes Requested")
  ).length

  const recentUpdates = workItems.filter(
    item => item.lastUpdated <= 1
  ).length

  // Calculate progress
  const highPriorityIssues = workItems.filter(
    item => item.type === "issue" && item.priority === "High"
  ).length

  const mediumPriorityIssues = workItems.filter(
    item => item.type === "issue" && item.priority === "Medium"
  ).length

  // Get the current date for the status update
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          {personFilter ? `${personFilter}'s Summary` : 'Team Status'} ({formattedDate})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {personFilter ? (
            <p>
              Currently working on {totalIssues} {totalIssues === 1 ? 'issue' : 'issues'} and
              has {totalPRs} {totalPRs === 1 ? 'pull request' : 'pull requests'} in review.
              {recentUpdates > 0 && ` ${recentUpdates} ${recentUpdates === 1 ? 'item has' : 'items have'} been updated in the last 24 hours.`}
            </p>
          ) : (
            <p>
              The team is currently working on {issuesInProgress} {issuesInProgress === 1 ? 'issue' : 'issues'},
              with {issuesInReview} in review and {issuesBlocked} blocked.
              There {prsNeedingReview === 1 ? 'is' : 'are'} {prsNeedingReview} pull {prsNeedingReview === 1 ? 'request' : 'requests'} waiting for review.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Priority Issues</span>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">
                {highPriorityIssues} High, {mediumPriorityIssues} Medium
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Recent Activity</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">
                {recentUpdates} {recentUpdates === 1 ? 'update' : 'updates'} in last 24h
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Needing Attention</span>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">
                {issuesBlocked} blocked, {prsNeedingReview} PRs to review
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
