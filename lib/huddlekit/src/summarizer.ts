import { GoogleGenAI } from "@google/genai";
import type { Issue, PullRequest } from "@huddlekit/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function summarizeIssues(issues: Issue[]): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Summarize these Jira issues in the form of a daily standup report:\n${issues.map((issue) => `${issue.title}, ${issue.assignee.name}, ${issue.status}`).join("\n")}`,
    config: {
      systemInstruction: "Answer as concisely as possible",
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate issues summary");
  }

  return response.text;
}

export async function summarizePullRequests(prs: PullRequest[]): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Summarize these Github Pull requests in the form of a daily standup report:\n${prs.map((pr) => `${pr.title}, ${pr.author.name}, ${pr.status}`).join("\n")}`,
    config: {
      systemInstruction: "Answer as concisely as possible",
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate pull requests summary");
  }

  return response.text;
}

export async function summarizeText(content: string | string[]): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Summarize these daily standup reports:\n${Array.isArray(content) ? content.join("\n") : content}`,
    config: {
      systemInstruction: "Summarize as concisely, avoid line breaks if possible",
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate final summary");
  }

  return response.text;
}
