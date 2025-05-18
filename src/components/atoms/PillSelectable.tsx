

interface PillProps {
    text?: string,
    isSelected?: boolean,
    callback?: (data: string) => void,
    value?: string 
}

const PillSelectable = ({text = "[Text]",  callback = () =>{}, value = undefined, isSelected = false}: PillProps) => {


    if(value == undefined){
        value ="both"
    }

    const handleSelectState = (_value: string) =>{ 
        callback(_value);
    }

    return(
    <div
        className={`w-fit h-fit rounded-xl p-1 mx-1 my-1 
                transition-colors duration-200 text-[10pt]
                border-[#4B4848] border-1 bg-none cursor-pointer
                text-[#4B4848] hover:bg-[#4B4848] hover:text-[var(--background)]
                        ${isSelected ? "bg-[#4B4848] text-[var(--background)]" : ""}`
            }
        onClick={() => handleSelectState(value)}
    >
        {text}
    </div>
)
}

export default PillSelectable;