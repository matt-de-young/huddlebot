import type { PullRequest } from "@huddlekit/types"

export async function fetchGithubPullRequests(): Promise<PullRequest[]> {

  await new Promise(resolve => setTimeout(resolve, 500));

  return [
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
}
