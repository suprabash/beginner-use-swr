"use client";
import React from "react";
import useSWR from "swr";
interface Response {
  completed: boolean;
  title: string;
  userId: Number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AutoRevalidation() {
  const { data, isLoading, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher,{
        revalidateIfStale:true,
        revalidateOnFocus:true
    }
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {data?.map((p: Response) => (
        <div key={p?.title} className="border border-solid border-white">
          <p>{p?.title}</p>
          <p>{p?.completed}</p>
        </div>
      ))}
    </div>
  );
}
