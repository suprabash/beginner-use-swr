"use client";
import React from "react";
import useSWRMutation from "swr/mutation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRMutation() {
  const { trigger, isMutating } = useSWRMutation(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );
  const triggerApiCall = async () => {
    try {
      const result = await trigger();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button disabled={isMutating} onClick={triggerApiCall}>
        Trigger Api call
      </button>
    </div>
  );
}
