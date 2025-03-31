import type { Issue, PullRequest } from "@huddlekit/types";
import { fetchGithubIssues, fetchGithubPullRequests } from "@huddlekit/integrations/github";
import { getGithubApiTokenForTeam } from "@/lib/db/queries";

export async function fetchIssuesForTeam(teamId: number): Promise<Issue[]> {
  console.debug(`fetching issues for team ${teamId}`);

  const apiToken = await getGithubApiTokenForTeam(teamId);
  if (!apiToken) {
    throw new Error("GitHub API token not found for team");
  }

  return fetchGithubIssues(apiToken, "matt-de-young", "huddlebot");
}

export async function fetchPullRequestsForTeam(teamId: number): Promise<PullRequest[]> {
  console.debug(`fetching PRs for team ${teamId}`);

  const apiToken = await getGithubApiTokenForTeam(teamId);
  if (!apiToken) {
    throw new Error("GitHub API token not found for team");
  }

  return fetchGithubPullRequests(apiToken, "matt-de-young", "huddlebot");
}
