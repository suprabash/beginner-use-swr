'use client';
import React from "react";
import useSWR from "swr";
import { addTodo, getTodos } from "./api";
// usecase when user submit data to server instead of showing loading appending data to ui 
// disadvantage user might get confuse
export default function OptimisticUpdates() {
  const { data, mutate } = useSWR(
    "/api/posts",
    getTodos
  );
  const handleApiCall = async () => {
    const text: string = "Test";
    try {
      // Update the local state immediately and fire the
      // request. Since the API will return the updated
      // data, there is no need to start a new revalidation
      // and we can directly populate the cache.
      await mutate(addTodo(text), {
        optimisticData: [...data as any, text],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });
      console.log("Successfull added");
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      console.log("Error occured while adding todo");
    }
  };
  return (
    <div>
      <button onClick={handleApiCall}>Test Button</button>

      <ul>
        {data
          ? data.map((todo: string,index:number) => {
              return <li key={index}>{todo}</li>;
            })
          : null}
      </ul>
    </div>
  );
}
