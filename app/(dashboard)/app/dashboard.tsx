"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  GitBranch,
  GitPullRequest,
  BugIcon as Issue,
  MoreHorizontal,
  XIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define TypeScript interfaces for our data structures
interface User {
  name: string;
  avatar: string;
  initials: string;
}

interface Reviewer extends User {
  status: 'approved' | 'changes_requested' | 'requested';
}

interface Issue {
  id: number;
  title: string;
  status: string;
  lastUpdated: number;
  assignee: User;
  priority: 'High' | 'Medium' | 'Low';
  labels: string[];
}

interface PullRequest {
  id: number;
  title: string;
  branch: string;
  status: string;
  lastUpdated: number;
  author: User;
  reviewers: Reviewer[];
  comments: number;
  changes: string;
}

interface WorkItem extends Issue {
  type: "issue";
  key: string;
}

interface WorkPR extends PullRequest {
  type: "pr";
  key: string;
}

type WorkItemUnion = WorkItem | WorkPR;

// Mock data for issues
const issues: Issue[] = [
  {
    id: 1,
    title: "Fix authentication bug in login flow",
    status: "In Progress",
    lastUpdated: 2,
    assignee: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    priority: "High",
    labels: ["bug", "auth"],
  },
  {
    id: 2,
    title: "Implement dark mode toggle",
    status: "In Progress",
    lastUpdated: 1,
    assignee: {
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
    },
    priority: "Medium",
    labels: ["feature", "ui"],
  },
  {
    id: 3,
    title: "Optimize image loading performance",
    status: "In Review",
    lastUpdated: 4,
    assignee: {
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    priority: "Medium",
    labels: ["performance"],
  },
  {
    id: 4,
    title: "Add unit tests for payment processing",
    status: "Blocked",
    lastUpdated: 7,
    assignee: {
      name: "Riley Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RB",
    },
    priority: "High",
    labels: ["testing", "payments"],
  },
  {
    id: 5,
    title: "Update documentation for API v2",
    status: "In Progress",
    lastUpdated: 3,
    assignee: {
      name: "Casey Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CW",
    },
    priority: "Low",
    labels: ["docs"],
  },
]

// Mock data for PRs
const pullRequests: PullRequest[] = [
  {
    id: 101,
    title: "Feature: User profile redesign",
    branch: "feature/user-profile",
    status: "Open",
    lastUpdated: 1,
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    reviewers: [
      {
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
        status: "approved",
      },
      {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
        status: "requested",
      },
    ],
    comments: 3,
    changes: "+234 -56",
  },
  {
    id: 102,
    title: "Fix: Authentication token refresh",
    branch: "fix/auth-refresh",
    status: "Changes Requested",
    lastUpdated: 3,
    author: {
      name: "Riley Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RB",
    },
    reviewers: [
      {
        name: "Casey Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "CW",
        status: "changes_requested",
      },
    ],
    comments: 5,
    changes: "+45 -12",
  },
  {
    id: 103,
    title: "Chore: Update dependencies",
    branch: "chore/update-deps",
    status: "Open",
    lastUpdated: 5,
    author: {
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
    },
    reviewers: [],
    comments: 0,
    changes: "+1245 -1190",
  },
  {
    id: 104,
    title: "Feature: Add analytics dashboard",
    branch: "feature/analytics",
    status: "Draft",
    lastUpdated: 2,
    author: {
      name: "Casey Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CW",
    },
    reviewers: [],
    comments: 2,
    changes: "+567 -12",
  },
]

const workItems: WorkItemUnion[] = [
  ...issues.map((issue): WorkItem => ({
    ...issue,
    type: "issue",
    key: `issue-${issue.id}`,
  })),
  ...pullRequests.map((pr): WorkPR => ({
    ...pr,
    type: "pr",
    key: `pr-${pr.id}`,
  })),
]

export function Dashboard() {
  // Add state for people filter
  const [personFilter, setPersonFilter] = useState<string>("");

  // Extract all unique people from issues and PRs
  const people = useMemo(() => {
    const peopleSet = new Set<string>();

    // Add all issue assignees
    issues.forEach(issue => {
      peopleSet.add(issue.assignee.name);
    });

    // Add all PR authors
    pullRequests.forEach(pr => {
      peopleSet.add(pr.author.name);

      // Also add reviewers
      pr.reviewers.forEach(reviewer => {
        peopleSet.add(reviewer.name);
      });
    });

    return Array.from(peopleSet).sort();
  }, []);

  // Filter work items based on selected person
  const filteredWorkItems = useMemo(() => {
    if (!personFilter) {
      return workItems;
    }

    return workItems.filter(item => {
      if (item.type === "issue") {
        return item.assignee.name === personFilter;
      } else {
        // For PRs, check both author and reviewers
        if (item.author.name === personFilter) {
          return true;
        }

        return item.reviewers.some(reviewer => reviewer.name === personFilter);
      }
    });
  }, [personFilter, workItems]);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500"
      case "In Review":
        return "text-purple-500"
      case "Blocked":
        return "text-red-500"
      case "Open":
        return "text-green-500"
      case "Changes Requested":
        return "text-amber-500"
      case "Draft":
        return "text-slate-500"
      default:
        return "text-gray-500"
    }
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-amber-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get reviewer status icon
  const getReviewerStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "changes_requested":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "requested":
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  // Render an issue card
  const renderIssueCard = (issue: WorkItem) => (
    <Card key={issue.key} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Issue className={`h-4 w-4 text-blue-500 ${getStatusColor(issue.status)}`} />
            <CardTitle className="text-base">{issue.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Change status</DropdownMenuItem>
              <DropdownMenuItem>Reassign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <div
            className={`h-2 w-2 rounded-full ${getPriorityColor(issue.priority)}`}
            title={`Priority: ${issue.priority}`}
          />
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

  const renderPRCard = (pr: WorkPR) => (
    <Card key={pr.key} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <GitPullRequest className={`h-4 w-4 text-purple-500 ${getStatusColor(pr.status)}`} />
            <CardTitle className="text-base">{pr.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Request changes</DropdownMenuItem>
              <DropdownMenuItem>Approve</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
  )

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <main className="flex-1 container py-6 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Team Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Select
                value={personFilter}
                onValueChange={(value) => setPersonFilter(value === "all" ? "" : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All team members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All team members</SelectItem>
                  {people.map(person => (
                    <SelectItem key={person} value={person}>{person}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {personFilter && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPersonFilter("")}
                  title="Clear filter"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Issue className="h-4 w-4 text-blue-500" />
                <span className="text-sm">
                  Issues: {filteredWorkItems.filter(item => item.type === "issue").length}
                </span>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <GitPullRequest className="h-4 w-4 text-purple-500" />
                <span className="text-sm">
                  PRs: {filteredWorkItems.filter(item => item.type === "pr").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {filteredWorkItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkItems.map((item) => (
              item.type === "issue" ? renderIssueCard(item) : renderPRCard(item)
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
