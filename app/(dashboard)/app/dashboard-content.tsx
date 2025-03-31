import { fetchIssuesForTeam, fetchPullRequestsForTeam } from "@/lib/api-server";
import type { WorkIssue, WorkPR, WorkItem } from "@huddlekit/types";
import { DashboardFilter } from "./dashboard-filter";

interface DashboardContentProps {
  teamId: number;
}

export async function DashboardContent({ teamId }: DashboardContentProps) {
  try {
    const issues = await fetchIssuesForTeam(teamId);
    const pullRequests = await fetchPullRequestsForTeam(teamId);

    // Create work items array
    const workItems: WorkItem[] = [
      ...issues.map(
        (issue): WorkIssue => ({
          ...issue,
          type: "issue",
          key: `issue-${issue.id}`,
        }),
      ),
      ...pullRequests.map(
        (pr): WorkPR => ({
          ...pr,
          type: "pr",
          key: `pr-${pr.id}`,
        }),
      ),
    ];

    // Extract all unique people (for the filter)
    const peopleSet = new Set<string>();

    // Add all issue assignees
    issues.forEach((issue) => {
      if (issue.assignee?.name) {
        peopleSet.add(issue.assignee.name);
      }
    });

    // Add all PR authors and reviewers
    pullRequests.forEach((pr) => {
      if (pr.author?.name) {
        peopleSet.add(pr.author.name);
      }

      pr.reviewers?.forEach((reviewer) => {
        if (reviewer.name) {
          peopleSet.add(reviewer.name);
        }
      });
    });

    const people = Array.from(peopleSet).sort();

    // Pass data to a client component for filtering
    return <DashboardFilter workItems={workItems} people={people} />;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred while fetching data.";
    return <div className="text-red-500">{errorMessage}</div>;
  }
}
