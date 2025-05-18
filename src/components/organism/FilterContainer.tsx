import { useState } from "react";
import PillSelectable from "../atoms/PillSelectable";

interface FilterContainerProps {
    callback: (filter: string) => void
}

const FilterContainer = ({callback}: FilterContainerProps) => {
    
    const [filterStates, setFilterStates] = useState({
      "movies" : {
        "value" : false
      },
      "books" : {
        "value" : false
      },
      "both" : {
        "value" : true
      }
    })

    const handleFilter = (filter: string) =>{

        if(filter == "movies"){
            setFilterStates({
                    "movies" : {
                        "value" : true
                    },
                    "books" : {
                        "value" : false
                    },
                    "both" : {
                        "value" : false
                    }
                })
        }
        if(filter == "books"){
            setFilterStates({
                    "movies" : {
                        "value" : false
                    },
                    "books" : {
                        "value" : true
                    },
                    "both" : {
                        "value" : false
                    }
                })
        }
        if(filter == "both"){
            setFilterStates({
                    "movies" : {
                        "value" : false
                    },
                    "books" : {
                        "value" : false
                    },
                    "both" : {
                        "value" : true
                    }
                })
        }
        callback(filter)
    }   

    return(
    <>
         <div className="border-[#7c7c7c] border-1 rounded-xl p-2 flex gap-2">
            <PillSelectable  key={"filter_movies"} text="Movies" callback={handleFilter} value="movies" isSelected={filterStates.movies.value}/>
            <PillSelectable  key={"filter_books"} text="Books" callback={handleFilter} value="books" isSelected={filterStates.books.value}/>
            <PillSelectable  key={"filter_both"} text="Movies + Books" callback={handleFilter} value="both" isSelected={filterStates.both.value}/>
        </div>
    </>
    )
}

export default FilterContainer;