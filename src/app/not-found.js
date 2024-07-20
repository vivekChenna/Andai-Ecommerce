"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        Sorry , we could n't find the page you're looking for
      </p>

      <button
        className="mx-auto mt-4 flex w-max items-center justify-center rounded-full bg-blue-600 py-2 px-4 tracking-wide text-white hover:opacity-90"
        onClick={() => {
          router.push("/");
        }}
      >
        Go Back Home
      </button>
    </div>
  );
}
