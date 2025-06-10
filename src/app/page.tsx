'use client';


import ButtonGeneric from "@/components/atoms/ButtonGeneric";
import InputSeach from "@/components/molecules/InputSearch";
import FilterContainer from "@/components/organism/FilterContainer";
import HistoryContainer from "@/components/organism/HistoryContainer";
import ProfileBundle from "@/components/organism/ProfileBundle";
import ResponseContainer from "@/components/organism/ResponseContainer";
import TagsContainer from "@/components/organism/TagsContainer";
import { UserContext } from "@/context/UserContext";
import { getIAReponse, OpenAIResponse, updateHistory } from "@/lib/api/client";
import { useContext, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<OpenAIResponse>({
    books: [],
    movies: [],
  });
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([])
  const [filter, setFilter] = useState<string>("both")

  const userData = useContext(UserContext)

  if (!userData) {
    return;
  }

  const fetchData = async () => {

    if (tags.length < 1) return

    try {
      setLoading(true);
      const res = await getIAReponse({ filter: filter, tags: tags });
      setResponse(res || { books: [], movies: [] });
      document.getElementById("response-container")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })

      if (userData.isLogin) {
        await updateHistory(
          userData.user.email,
          [
            ...userData.user.history,
            {
              books: res.books,
              movies: res.movies,
              date: new Date()
            }
          ]
        );

        userData.setUser(
          {
            email: userData.user.email,
            nombre: userData.user.nombre,
            history: [...userData.user.history,{
              books: res.books,
              movies: res.movies,
              date: new Date()
            }]
          }
        )
      }
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
    py-36 px-36 gap-2 font-[family-name:var(--font-geist-sans)]
    max-md:px-12
    ">
      <div className="flex flex-col gap-3 items-center mb-24 max-md:gap-1">
        <div className="flex gap-3 text-[32pt] max-md:text-[16pt] max-md:gap-1">
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
            <p className="font-extralight text-[10pt]">
              Press “space” to add new tags in the search.
              If you want to add a space, use “-”
            </p>
            <div className="flex gap-3">
              <InputSeach callback={updateTags} tags={tags}/>
              <ButtonGeneric callback={fetchData} disable={loading}>
                  {loading ? "Loading..." :

                    <svg width="20px" height="20px" viewBox="0 0 24 24"
                      strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg"
                      color="#000000"

                    >
                      <path d="M17 17L21 21" stroke="#000000"
                        strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 
              16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 
              3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>

                  }
              </ButtonGeneric>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-6 max-md:flex-col">
          <div className="w-full">
            Tags
            <TagsContainer tags={tags} callback={setTags} />
          </div>
          <div className="w-full">
            Filters

            <FilterContainer callback={setFilter} />
          </div>
        </div>
      </div>
      <div id="response-container" className="flex flex-col items-start gap-y-6 w-full mb-24">
        <ResponseContainer key={"response_container"} response={response} />
      </div>
      <ProfileBundle />
      {
        userData.isLogin && userData.user.history ?
          userData.user.history.length > 0 ?
            <HistoryContainer key={"history_container"} response={userData.user.history} />
            : <h1> No data to display in your history</h1>
          :
          <h1> Login to access to your history... </h1>
      }
    </div>
  );
}