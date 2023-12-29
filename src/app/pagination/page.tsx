"use client";
import React, { useState } from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

export default function Pagination() {
  const [repo, setRepo] = useState<string>("reactjs/react-a11y");
  const [val, setVal] = useState<string>(repo);
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index: number) =>
        `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
          index + 1
        }
          `,
      fetcher
    );

  const issues = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <div>
      <div className="flex flex-row gap-3">
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </button>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </div>
      {isEmpty ? <p>Yay, no issues found.</p> : null}
      {issues.map((issue: { id: number; title: string }) => {
        return (
          <p key={issue.id} style={{ margin: "6px 0" }}>
            - {issue.title}
          </p>
        );
      })}
    </div>
  );
}
