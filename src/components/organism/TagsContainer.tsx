import DeletablePill from "../atoms/DeletablePill"

interface TagsContainerProps {
    tags: string[],
    callback: (tags: string[]) => void
}

const TagsContainer = ({ tags, callback }: TagsContainerProps) => {

    const deleteTags = (tag: string) => {
        callback(
            tags.filter((item) => item !== tag)
        )
    }

    return (
        <>
            <div className="flex w-full relative h-auto">        
            <div className="bg-[#F0F0F0] rounded-xl p-2 flex gap-2 w-full flex-wrap">
                {
                    tags.length < 1 ?
                        <p className=" max-md:text-[10pt]">When you add tags, they will be here...</p> :

                        tags.map((item, _index) => (<DeletablePill key={_index + item} text={item} callback={deleteTags} id={_index + item} />))
                }
            </div>
                {
                    tags.length > 0 ?
                    <div className="bg-gray-600 rounded-xl p-2 flex gap-2 w-fit 
                    text-[10pt] text-white items-center 
                    absolute right-0 -bottom-10 transition-transform duration-200
                    hover:scale-105
                    " onClick={() => callback([])}>
                        Clear x
                    </div>

                    : null
                }
            </div>

        </>
    )
}

export default TagsContainer