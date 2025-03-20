export interface User {
  name: string;
  avatar: string;
  initials: string;
}

export interface Reviewer extends User {
  status: 'approved' | 'changes_requested' | 'requested';
}

export interface Issue {
  id: number;
  title: string;
  status: string;
  lastUpdated: number;
  assignee: User;
  priority: 'High' | 'Medium' | 'Low';
  labels: string[];
}

export interface PullRequest {
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

export interface WorkItem extends Issue {
  type: "issue";
  key: string;
}

export interface WorkPR extends PullRequest {
  type: "pr";
  key: string;
}

export type WorkItemUnion = WorkItem | WorkPR;
