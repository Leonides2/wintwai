import { Item } from "@/lib/models/Item"

interface ItemCardProps{
    item: Item
}

const ItemCard = ({item}: ItemCardProps) =>{


    return (
    <>
        <div key={item.title} className="size-96 grid grid-rows-[40%_1fr_10%]">
              <div className="h-full bg-gray-100 rounded-t-xl">
                <img src={item.image} className="w-max h-auto"></img>
              </div>
              <div className="bg-gray-300 rounded-b-xl p-2">
                <p>{item.title} ({item.release_year})</p>
                <div></div>
                <p>{item.description}</p>
                <a href={item.link} 
                className="bg-fuchsia-100 size-fit"
                >
                    <svg width="24px" height="24px" 
                    stroke-width="1.5" viewBox="0 0 24 24" 
                    fill="none" xmlns="http://www.w3.org/2000/svg" 
                    color="#000000"
                    className="*:stroke-blue-400  hover:scale-150"
                    >
                        <path d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 
                        7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 
                        14.376 3.70973 16.3664 6 16.8714C6.36756 
                        16.9525 6.75006 16.9952 7.14286 16.9952" 
                        stroke="#000000" stroke-width="1.5" 
                        stroke-linecap="round" stroke-linejoin="round"
                        >
                        </path>
                    <path d="M10 11.9976C10 14.4893 12.317 
                    16.9952 15.1429 16.9952C15.4776 16.9952 
                    16.581 16.9952 16.8571 16.9952C19.6975 
                    16.9952 22 14.7577 22 11.9976C22 9.6192 
                    20.2903 7.62884 18 7.12383C17.6324 7.04278 
                    17.2499 6.99999 16.8571 6.99999" 
                    stroke="#000000" 
                    stroke-width="1.5" 
                    stroke-linecap="round" 
                    stroke-linejoin="round">
                    </path>
                </svg>
                </a>
              </div>
              <div className="flex flex-wrap">
                {
                  item.tags.map((t, _index) => (
                    <div key={_index + t}
                      className="
                  bg-gray-400 hover:bg-gray-200 
                  rounded-xl p-1 mx-1 my-1 
                  transition-colors duration-200
                  ">
                      {t}
                    </div>
                  ))
                }
              </div>
            </div>
    </>
    )
}
export default ItemCard