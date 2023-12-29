"use client";
import useSWR from "swr";
interface Response {
  completed: boolean;
  title: string;
  userId: Number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {data?.map((p: Response) => (
        <div key={p?.title} className="border border-solid border-white">
          <p>{p?.title}</p>
          <p>{p?.completed}</p>
        </div>
      ))}
    </div>
  );
}
