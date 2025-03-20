"use client"

import { Button } from "@/components/ui/button"
import {
  GitBranch,
  GitPullRequest,
  BugIcon as Issue,
  XIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"
import { IssueCard } from "@/components/issue-card"
import { PRCard } from "@/components/pr-card"
import { Issue as IssueType, PullRequest, WorkItem, WorkPR, WorkItemUnion } from "@/types/work-items"
import { Summary } from "@/components/summary"

// Mock data for issues
const issues: IssueType[] = [
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

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <main className="flex-1 container py-6 px-4">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Summary</h2>
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
        <Summary workItems={filteredWorkItems} personFilter={personFilter} />


        <h2 className="text-2xl font-bold mb-6">Activity</h2>

        {filteredWorkItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkItems.map((item) => (
              item.type === "issue"
                ? <IssueCard key={item.key} issue={item} />
                : <PRCard key={item.key} pr={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
