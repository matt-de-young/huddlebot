import type { Issue, PullRequest } from "@huddlekit/types"
import { fetchLinearIssues } from "@huddlekit/integrations/linear";
import { fetchGithubPullRequests } from "./huddlekit/src/integrations/github";

export async function fetchIssuesForTeam(teamId: number): Promise<Issue[]> {

  console.debug(`fetching issues for team ${teamId}`)
  await new Promise(resolve => setTimeout(resolve, 500));

  return fetchLinearIssues()
}

export async function fetchPullRequestsForTeam(teamId: number): Promise<PullRequest[]> {

  console.debug(`fetching PRs for team ${teamId}`)
  await new Promise(resolve => setTimeout(resolve, 500));

  return fetchGithubPullRequests()
}
