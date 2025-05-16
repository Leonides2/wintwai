import DeletablePill from "../atoms/DeletablePill"

interface TagsContainerProps {
    tags: string[],
    callback: (tags: string[]) => void
}

const TagsContainer = ({tags, callback}: TagsContainerProps) => {

    const deleteTags = (tag: string) => {
        callback(
            tags.filter((item)=> item !== tag)
        )
    }
 
    return(
    <>
        <div className="bg-[#F0F0F0] rounded-xl p-2 flex gap-2">
            {
                tags.length < 1 ? 
                <p>When you add tags, they will be here...</p> :

                tags.map((item, _index)=>( <DeletablePill key={_index + item} text={item} callback={deleteTags} id={_index + item}/>))
            }
        </div>
    </>
    )
}

export default TagsContainer