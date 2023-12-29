"use client";
import React, { MouseEventHandler, useState } from "react";
import useSWR, { SWRResponse } from "swr";
// a fake API that returns data or error randomly
const fetchCurrentTime = async (counter: number) => {
  // wait for 1s
  await new Promise((res) => setTimeout(res, 1000));
  if (counter % 2 === 0) {
    throw new Error("Error has occured!");
  }
  return new Date().getFullYear();
};
export default function ErrorHandling() {
  const [counter, setCounter] = useState<number>(0);
  const { data, error, mutate, isValidating }= useSWR(
    "/api",
    () => fetchCurrentTime(counter),
    { dedupingInterval: 0 }
  );
  const incrementCounter: MouseEventHandler = () => {
    setCounter(counter + 1);
    mutate();
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <p>{data}</p>
      <p>Loading: {isValidating ? "true" : "false"}</p>
      <button onClick={incrementCounter}>
        <span>Refresh</span>
      </button>
      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </div>
  );
}
