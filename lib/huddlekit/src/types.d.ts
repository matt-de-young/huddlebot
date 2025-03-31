export interface Person {
  name: string;
  avatar: string;
  initials: string;
}

export interface Reviewer extends Person {
  status: "approved" | "changes_requested" | "requested";
}

export interface Issue {
  id: number;
  title: string;
  status: string;
  lastUpdated: number;
  assignee: Person;
  priority: "High" | "Medium" | "Low";
  labels: string[];
}

export interface PullRequest {
  id: number;
  title: string;
  branch: string;
  status: string;
  lastUpdated: number;
  author: Person;
  reviewers: Reviewer[];
  comments: number;
  changes: string;
}

export interface WorkIssue extends Issue {
  type: "issue";
  key: string;
}

export interface WorkPR extends PullRequest {
  type: "pr";
  key: string;
}

export type WorkItem = WorkIssue | WorkPR;

// GitHub-specific types
export interface GithubUser extends Person {
  login: string;
  avatar_url: string;
}

export interface GithubLabel {
  name: string;
}

export interface GithubIssue extends Issue {
  updated_at: string;
  state: string;
  assignee: GithubUser | null;
  labels: GithubLabel[];
  pull_request?: object; // Optional field to indicate if the issue is a pull request
}

export interface GithubPullRequest extends PullRequest {
  updated_at: string;
  head: {
    ref: string;
  };
  state: string;
  user: GithubUser;
  requested_reviewers: GithubUser[];
  additions: number;
  deletions: number;
}
