import { NextRequest, NextResponse } from "next/server";
import { summarizeIssues, summarizePullRequests, summarizeText } from "@/lib/huddlekit/src/summarizer";
import type { WorkItem } from "@huddlekit/types";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { workItems } = await req.json();

    if (!workItems || !Array.isArray(workItems)) {
      console.error("Invalid request body:", workItems);
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const issues = workItems.filter((item: WorkItem) => item.type === "issue");
    const prs = workItems.filter((item: WorkItem) => item.type === "pr");

    const issuesSummary = await summarizeIssues(issues);
    const prsSummary = await summarizePullRequests(prs);

    const finalSummary = await summarizeText([issuesSummary, prsSummary]);

    return NextResponse.json({ summary: finalSummary }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error generating summary:", error.message);
      return NextResponse.json({ message: "Error generating summary", error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error generating summary");
      return NextResponse.json({ message: "Error generating summary" }, { status: 500 });
    }
  }
}
