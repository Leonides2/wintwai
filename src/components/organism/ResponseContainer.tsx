import { OpenAIResponse } from "@/lib/api/client"
import ItemCard from "../molecules/ItemCard"


interface ResponseContainerProps {
    response: OpenAIResponse
}


const ResponseContainer = ({response}: ResponseContainerProps)  => {
    return(
        <>
        {
          response.books.length > 0 ? <h1>Books ({response.books.length} results)</h1> : <></>
        }
        <div className="flex gap-3 flex-wrap overflow-auto w-full"
          style={{
            scrollbarWidth: "thin"
          }}
        >
          {response.books.length > 0 && response.books.map((item, _index) => (
            <ItemCard key={_index + item.title} item={item}  type="Book"/>
          ))}
        </div>
        {
          response.movies.length > 0 ? <h1> Movies ({response.movies.length} results)</h1> : <></>
        }
        <div className="flex gap-3 flex-wrap overflow-auto w-full">
          {response.movies.length > 0 && response.movies.map((item, _index) => (
            <ItemCard key={_index + item.title} item={item}  type="Movie"/>
          ))}
        </div>
        </>
    )
}

export default ResponseContainer;