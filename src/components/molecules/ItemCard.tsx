import { Movie } from "@/lib/models/Movie"
import Pill from "../atoms/Pill"
import { useEffect, useState } from "react"
import { getBookCover, getMoviePoster } from "@/lib/api/client"
import { Book } from "@/lib/models/Book";


interface ItemCardProps {
  item: Movie | Book;
  type: "Movie" | "Book"
}

const ItemCard = ({ item, type }: ItemCardProps) => {

  const [url, setUrl] = useState(item.image);
  const [isCoverOn, setIsCoverOn] = useState(true)



  const fetchData = async () => {

    try {
      let res: string | undefined

      if (type == "Movie") {
        res = await getMoviePoster({title: item.title});
      }
      if (type == "Book" && "isbn" in item && "isbn") {
        res = await getBookCover(item.isbn)
      }

      setUrl(res ?? "https://picsum.photos/200/300");
    } catch (error) {
      console.error("Error fetching data:", error);
      //alert("Failed to fetch data. Please try again.");
    } 
  };

  useEffect(() => {
    fetchData();
  }, [url])


  return (
    <>
      <div key={item.title} className="h-90 max-w-1/2 grid grid-cols-1 grid-rows-1 
      bg-gray-600 rounded-xl aspect-[3/4] overflow-clip relative max-md:max-w-full
        "
        onDoubleClick={()=> setIsCoverOn(!isCoverOn)}
        onTouchStart={()=> setIsCoverOn(!isCoverOn)}
        
        >
          <img
            src={url}
            alt={item.title}
            onError={()=> {setUrl("https://placehold.co/270x360")}}
            className={`h-full w-full object-cover rounded-xl z-30 
             hover:opacity-60 cursor-pointer transition-all
              ${isCoverOn ? "absolute inset-0 duration-300" : 
                "absolute top-0 left-[-150%] duration-500"}
            `}
            style={{ pointerEvents: "auto" }}
          />

          <div className="relative z-10 flex flex-col h-full w-full">
            <div className="bg-gray-300 rounded-xl p-2 h-full w-full">
            <p>{item.title} ({item.release_year})</p>
            <div className="h-0.5 w-full bg-[var(--foreground)]" ></div>
            <p className="overflow-ellipsis">{item.description}</p>
            <div className=" flex h-7 w-fit gap-x-1 **:stroke-blue-400 **:text-blue-400
              items-center
            ">
            <a href={item.link} target="_blank">
              <svg width="24px" height="24px"
                strokeWidth="1.5" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                color="#000000"
                className="hover:scale-150"
              >
                <path d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 
                        7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 
                        14.376 3.70973 16.3664 6 16.8714C6.36756 
                        16.9525 6.75006 16.9952 7.14286 16.9952"
                  stroke="#000000" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                </path>
                <path d="M10 11.9976C10 14.4893 12.317 
                    16.9952 15.1429 16.9952C15.4776 16.9952 
                    16.581 16.9952 16.8571 16.9952C19.6975 
                    16.9952 22 14.7577 22 11.9976C22 9.6192 
                    20.2903 7.62884 18 7.12383C17.6324 7.04278 
                    17.2499 6.99999 16.8571 6.99999"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                </path>
              </svg>
            </a>
            <p className="text-[10pt]">
              Link
            </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            {
              item.tags.map((t, _index) => (
                <Pill type="Border" key={_index + t} text={t} />
              ))
            }
          </div>
        </div>      
      </div>
    </>
  )
}
export default ItemCard