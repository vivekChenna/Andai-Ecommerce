"use client";

import { usePlugins } from "@/context/pluginsContext";
import { FilterPlugins } from "@/lib/FilterPlugins";
import { createUrl } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { createUrl } from 'lib/utils';
import { useRouter, useSearchParams } from "next/navigation";

export default function Search({ placeholder, py }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setPluginsText } = usePlugins();

  async function onSubmit(e) {
    e.preventDefault();
    const val = e.target;
    const search = val.search;

    // const response = await fetch(
    //   "https://sigma.andaihub.com/v1/workflows/run",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer app-cms2cAAeQic9tAemM6gI5efa",
    //     },

    //     body: JSON.stringify({
    //       inputs: {
    //         user_query: search?.value,
    //       },
    //       user: "abc-123",
    //     }),
    //   }
    // );

    // const jsonData = await response.json();

    const pluginsResponse = await FilterPlugins(search?.value);


    const pluginsData = pluginsResponse?.choices[0]?.message?.content;

    setPluginsText(pluginsData);

    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
      // newParams.set("data", jsonData?.data?.outputs?.text);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/search", newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder={placeholder ? placeholder : "Search for plugins..."}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className={`
    w-full
    rounded-lg
    border
    px-4
    ${py ? py : "py-2"}
    text-sm
    text-neutral-800
    placeholder:text-neutral-500
    bg-white
    dark:bg-neutral-800
    dark:text-white
    dark:placeholder:text-neutral-400
    andai:placeholder:text-neutral-400
    border-neutral-500
    dark:border-neutral-600
    andai:bg-neutral-800
    andai:text-white

     focus:ring-2
     focus:ring-zinc-500
     focus:border-zinc-500
    focus:outline-none
    transition-all
    `}
      />

      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-5 text-gray-500" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for plugins..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
