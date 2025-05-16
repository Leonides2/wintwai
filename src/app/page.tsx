'use client';

import Button from "@/components/atoms/Button";
import InputSeach from "@/components/molecules/InputSearch";
import ItemCard from "@/components/molecules/ItemCard";
import TagsContainer from "@/components/molecules/TagsContainer";
import { getIAReponse, OpenAIResponse } from "@/lib/api/client";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<OpenAIResponse>({
    books: [],
    movies: [],
  });
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([])

  const fetchData = async () => {

    if (tags.length < 1) return

    try {
      setLoading(true);
      const res = await getIAReponse({ filter: "both", tags: tags });
      setResponse(res || { books: [], movies: [] });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateTags = (tag: string) => {
    setTags((prev) => [...prev, tag])
  }



  return (
    <div className="flex flex-col 
    items-center justify-items-center min-h-screen 
    max-w-full
    py-36 px-36 gap-2 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-3 items-center mb-24">
        <div className="flex gap-3 text-[32pt]">
          <h1 className="font-bold">What</h1>
          <h1 className="font-bold">I</h1>
          <h1 className="font-bold text-fuchsia-500">need</h1>
          <h1 className="font-bold">to</h1>
          <h1 className="font-bold">watch</h1>
          <h1 className="font-bold">?</h1>
          <h1 id="AI-tag" className="font-bold text-red-600">AI</h1>
        </div>
        <div>
          <p className="text-[10pt] font-extralight">Discover new movies and books</p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex gap-3 mb-3">
          <div className="flex flex-col w-full">
            <p className="font-extralight">
              Press “space” to add new tags in the search. 
              If you want to add a space, use “-”
            </p>
            <div className="flex gap-3">
              <InputSeach callback={updateTags} />
              <Button>
            <button onClick={fetchData} disabled={loading}>
              {loading ? "Loading..." :

                <svg width="20px" height="20px" viewBox="0 0 24 24"
                  stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg"
                  color="#000000"

                >
                  <path d="M17 17L21 21" stroke="#000000"
                    stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                  <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 
              16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 
              3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>

              }
            </button>
          </Button>
            </div>
          </div>
        </div>
        <div>
          Tags
          <TagsContainer tags={tags} callback={setTags} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-6 ">
        {
          response.books.length > 0 ? <h1> Books</h1> : <></>
        }
        <div className="flex gap-3 flex-wrap overflow-x-scroll">
          {response.books.length > 0 && response.books.map((item, _index) => (
            <ItemCard key={_index + item.title} item={item} />
          ))}
        </div>
        {
          response.movies.length > 0 ? <h1> Movies</h1> : <></>
        }
        <div className="flex gap-3 overflow-x-scroll">
          {response.movies.length > 0 && response.movies.map((item, _index) => (
            <ItemCard key={_index + item.title} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}