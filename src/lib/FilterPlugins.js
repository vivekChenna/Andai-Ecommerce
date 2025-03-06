import { getFilterPluginsPayload } from "./getFilterPluginsPayload";

export const FilterPlugins = async (query) => {
  const endpoint = `https://ai-vdwivedi6332ai921470488247.openai.azure.com/openai/deployments/gpt-4o-3/chat/completions?api-version=2024-08-01-preview`;


  const payload = getFilterPluginsPayload(query);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log("error", error);
  }
};
