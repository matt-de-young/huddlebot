import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"
import type { WorkIssue } from "@huddlekit/types"

export function IssueCard({ issue }: {issue: WorkIssue}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{issue.title}</CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2">
          <span>#{issue.id}</span>
          <span>•</span>
          <span>{issue.status}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {issue.labels.map((label) => (
            <Badge key={label} variant="outline" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
              <AvatarFallback>{issue.assignee.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{issue.assignee.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 mr-1" />
        {issue.lastUpdated === 0
          ? "Updated today"
          : issue.lastUpdated === 1
            ? "Updated yesterday"
            : `Updated ${issue.lastUpdated} days ago`}
      </CardFooter>
    </Card>
  )
}
