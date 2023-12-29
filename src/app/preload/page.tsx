"use client";
import React from "react";
import useSWR, { preload } from "swr";
interface Response {
  completed: boolean;
  title: string;
  userId: Number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function PreloadData() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );
  const preloadData = async () => {
    await preload("https://jsonplaceholder.typicode.com/posts", fetcher);
  };
  return (
    <div>
      {data?.map((p: Response) => (
        <div key={p?.title} className="border border-solid border-white">
          <p>{p?.title}</p>
          <p>{p?.completed}</p>
        </div>
      ))}
      <button onMouseEnter={preloadData}>Hover</button>
    </div>
  );
}
