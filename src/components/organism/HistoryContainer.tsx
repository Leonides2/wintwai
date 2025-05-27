
import ItemCard from "../molecules/ItemCard"
import { MovieBooksCollectionItem } from "@/lib/models/Movie"


interface ResponseContainerProps {
  response: MovieBooksCollectionItem[]
}


const HistoryContainer = ({ response }: ResponseContainerProps) => {


  return (
    <>
      {
        response.map((item) => {
          const dateHistory = new Date(item.date)
          return (
            <>
              <h2>
                 {dateHistory.toLocaleString('es')}
              </h2>
              {
                item.books.length > 0 ? <h1>Books ({item.books.length} results)</h1> : <></>
              }
              <div className="flex gap-3 flex-wrap overflow-auto w-full"
                style={{
                  scrollbarWidth: "thin"
                }}
              >
                {item.books.length > 0 && item.books.map((item, _index) => (
                  <ItemCard key={_index + item.title} item={item} type="Book" />
                ))}
              </div>
              {
                item.movies.length > 0 ? <h1> Movies ({item.movies.length} results)</h1> : <></>
              }
              <div className="flex gap-3 flex-wrap overflow-auto w-full">
                {item.movies.length > 0 && item.movies.map((item, _index) => (
                  <ItemCard key={_index + item.title} item={item} type="Movie" />
                ))}
              </div>
            </>
          )
        })


      }

    </>
  )
}

export default HistoryContainer;