import type { Issue, PullRequest, Person } from "@huddlekit/types";

export async function fetchGithubIssues(apiToken: string, owner: string, repo: string): Promise<Issue[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${apiToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  const data = await response.json();

  return data
    .filter((issue: any) => !issue.pull_request) // Filter out pull requests
    .map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      status: issue.state,
      lastUpdated: new Date(issue.updated_at).getTime(),
      assignee: issue.assignee
        ? {
            name: issue.assignee.login,
            avatar: issue.assignee.avatar_url,
            initials: issue.assignee.login
              .split(" ")
              .map((n: string) => n[0])
              .join(""),
          }
        : {
            name: "Unassigned",
            avatar: "",
            initials: "U",
          },
      priority: "Medium", // GitHub issues do not have a priority field, so we set a default value
      labels: issue.labels ? issue.labels.map((label: any) => label.name) : [],
    }));
}

export async function fetchGithubPullRequests(apiToken: string, owner: string, repo: string): Promise<PullRequest[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open`;

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${apiToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }

  const data = await response.json();

  return data.map((pr: any) => ({
    id: pr.id,
    title: pr.title,
    branch: pr.head.ref,
    status: pr.state,
    lastUpdated: new Date(pr.updated_at).getTime(),
    author: {
      name: pr.user.login,
      avatar: pr.user.avatar_url,
      initials: pr.user.login
        .split(" ")
        .map((n: string) => n[0])
        .join(""),
    },
    reviewers: pr.requested_reviewers.map((reviewer: any) => ({
      name: reviewer.login,
      avatar: reviewer.avatar_url,
      initials: reviewer.login
        .split(" ")
        .map((n: string) => n[0])
        .join(""),
      status: "requested", // GitHub API does not provide review status in this endpoint
    })),
    comments: pr.comments,
    changes: `+${pr.additions} -${pr.deletions}`,
  }));
}
