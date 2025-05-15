'use client';

import ItemCard from "@/components/molecules/ItemCard";
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
        <h1 className="text-3xl font-bold text-fuchsia-500">need</h1>
        <h1 className="text-3xl font-bold">to</h1>
        <h1 className="text-3xl font-bold">watch</h1>
        <h1 className="text-3xl font-bold">?</h1>
        <h1 className="text-3xl font-bold text-red-600">AI</h1>
      </div>
      <div className="flex flex-col items-start gap-y-6 ">
        {
          response.books.length > 0 ? <h1> Books</h1> : <></>
        }
        <div className="flex gap-3">
          {response.books.length > 0 && response.books.map((item, _index) => (
            <ItemCard key={_index + item.title} item={item}/>
          ))}
        </div>
        {
          response.movies.length > 0 ? <h1> Movies</h1> : <></>
        }
        <div className="flex gap-3">
          {response.movies.length > 0 && response.movies.map((item, _index) => (
            <ItemCard key={_index + item.title} item={item}/>
          ))}
        </div>
      </div>

      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Do a fetch"}
      </button>
    </div>
  );
}