import type { Issue } from "@huddlekit/types"

export async function fetchLinearIssues(): Promise<Issue[]> {

  await new Promise(resolve => setTimeout(resolve, 250));

  return [
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
}
