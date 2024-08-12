"use client";

import { useCompletion } from "ai/react";
import { useState } from "react";
import { LoaderIcon, SparklesIcon } from "@/components/icons";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

export default function SuggestionPage() {
  const [myText, setMyText] = useState("");

  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    body: { myText },
    onFinish: (prompt, completion) => {
      console.log("on finish called");
      setMyText(completion.trim());
    },
    onError: (error) => toast.error(error.message),
    api: "/api/completion",
  });


  return (
    <form
      className="flex flex-col items-center md:mt-32 mt-10 min-w-full grow pt-10 md:pt-0 lg:pt-0 md:px-0 px-3 mb-10"
      onSubmit={(e) => {
        handleSubmit(e);
        setInput("");
      }}
    >
      <TextareaAutosize
        value={isLoading && completion.length > 0 ? completion.trim() : myText}
        readOnly
        className="rounded-lg drop-shadow-sm bg-gray-100 border border-gray-200 px-2 pt-2 pb-6 md:resize dark:bg-gray-900 dark:border-gray-800 min-w-full max-w-7xl md:min-w-96 min-h-56 md:w-5/12 focus:outline-none focus:border-blue-300 dark:focus:border-blue-700 transition-colors max-h-[52rem]"
        placeholder="Want to be Ai ready?? Let's find the perfect AI plugin..."
        aria-label="Text"
        cacheMeasurements
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }}
      />

      <div className="rounded-full drop-shadow-sm bg-gray-100 border border-gray-200 -mt-5 dark:bg-gray-900 dark:border-gray-800 flex focus-within:border-blue-300 dark:focus-within:border-blue-700 transition-colors md:w-[30%]">
        <input
          className="bg-transparent rounded-full py-1 px-4 focus:outline-none w-full"
          placeholder="Type your query to get smart AI plugin suggestions..."
          onChange={handleInputChange}
          value={input}
          aria-label="Prompt"
          required
        />

        <button
          aria-label="Submit"
          type="submit"
          className="rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors text-white size-8 md:size-10 flex items-center justify-center"
        >
          {isLoading ? <LoaderIcon /> : <SparklesIcon />}
        </button>
      </div>
    </form>
  );
}
