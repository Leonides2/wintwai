'use client';

import { getIAReponse, OpenAIResponse } from "@/lib/api/client";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<OpenAIResponse>({
    books: [],
    movies: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getIAReponse({ filter: "both", tags: ["terror", "drama"] });
      setResponse(res || { books: [], movies: [] });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row gap-3">
        <h1 className="text-3xl font-bold">What</h1>
        <h1 className="text-3xl font-bold">I</h1>
        <h1 className="text-3xl font-bold">need</h1>
        <h1 className="text-3xl font-bold">to</h1>
        <h1 className="text-3xl font-bold">watch</h1>
        <h1 className="text-3xl font-bold">?</h1>
        <h1 className="text-3xl font-bold">AI</h1>
      </div>
      <p>
        {response.books.length > 0 && response.books.map((item) => (
          <div key={item.title}>
            <p>title: {item.title}</p>
            <p>description: {item.description}</p>
            <p>release year: {item.release_year}</p>
          </div>
        ))}

        {response.movies.length > 0 && response.movies.map((item) => (
          <div key={item.title}>
            <p>title: {item.title}</p>
            <p>description: {item.description}</p>
            <p>release year: {item.release_year}</p>
          </div>
        ))}
      </p>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Do a fetch"}
      </button>
    </div>
  );
}