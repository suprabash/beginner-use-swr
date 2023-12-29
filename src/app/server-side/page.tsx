"use client ";
//still working on
import useSWR from "swr";
let restAPI = "https://swr-posts-api.trillionz.repl.co";

const url = `${restAPI}/api/post`;

const Post = ({ initialPost }: { initialPost: any }) => {
  const { data: post, mutate } = useSWR(
    url,
    (url) => fetch(url).then((res) => res.json()),
    { fallbackData: { initialPost } }
  );

  return (
    <>
      <header className="p-7 text-center bg-primary shadow-md">
        <h1 className="text-secondary font-bold text-xl capitalize">
          Reading: {post.title}
        </h1>
      </header>
      <main className="max-w-[1100px] mx-auto mt-10 pb-10 px-4">
        <div className="bg-primary p-10 rounded-lg shadow-md" key={post.id}>
          <span className="block mb-4 font-bold text-lg text-secondary capitalize">
            {post.title}
          </span>
          <span className="text-secondary">{post.body}</span>
          <p className="text-secondary mt-5">
            <strong>Views</strong>: {post.views}
          </p>
        </div>
        <button
          onClick={async () => {
            await fetch(url, {
              method: "put",
            });
            mutate();
          }}
        >
          Increment views
        </button>
      </main>
    </>
  );
};

const Index = ({ post }: { post: any }) => {
  return <Post initialPost={post} />;
};

export default Index;
