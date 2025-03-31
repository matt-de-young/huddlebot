"use client";

import { useState, useMemo } from "react";
import { GitPullRequest, BugIcon as Issue, XIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IssueCard } from "@/components/issue-card";
import { PRCard } from "@/components/pr-card";
import type { WorkItem } from "@huddlekit/types";
import { Summary } from "@/components/summary";

interface DashboardFilterProps {
  workItems: WorkItem[];
  people: string[];
}

export function DashboardFilter({ workItems, people }: DashboardFilterProps) {
  const [personFilter, setPersonFilter] = useState<string>("");

  // Client-side filtering based on selected person
  const filteredWorkItems = useMemo(() => {
    if (!personFilter) {
      return workItems;
    }

    return workItems.filter((item) => {
      if (item.type === "issue") {
        return item.assignee.name === personFilter;
      } else {
        // For PRs, check both author and reviewers
        if (item.author.name === personFilter) {
          return true;
        }

        return item.reviewers.some((reviewer) => reviewer.name === personFilter);
      }
    });
  }, [personFilter, workItems]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Summary</h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={personFilter} onValueChange={(value) => setPersonFilter(value === "all" ? "" : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All team members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All team members</SelectItem>
                {people.map((person) => (
                  <SelectItem key={person} value={person}>
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {personFilter && (
              <Button variant="outline" size="icon" onClick={() => setPersonFilter("")} title="Clear filter">
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Issue className="h-4 w-4 text-blue-500" />
              <span className="text-sm">
                Issues: {filteredWorkItems.filter((item) => item.type === "issue").length}
              </span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <GitPullRequest className="h-4 w-4 text-purple-500" />
              <span className="text-sm">PRs: {filteredWorkItems.filter((item) => item.type === "pr").length}</span>
            </div>
          </div>
        </div>
      </div>

      <Summary workItems={filteredWorkItems} personFilter={personFilter} />

      <h2 className="text-2xl font-bold mb-6">Activity</h2>

      {filteredWorkItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkItems.map((item) =>
            item.type === "issue" ? <IssueCard key={item.key} issue={item} /> : <PRCard key={item.key} pr={item} />,
          )}
        </div>
      )}
    </>
  );
}
