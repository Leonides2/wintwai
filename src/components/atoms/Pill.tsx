

interface PillProps {
    text?: string,
    type: "Fill" | "Border" | "Hollow",
}

const Pill = ({text = "[Text]", type }: PillProps) => {



    return(
    <div
        className={`text-[#4B4848] w-fit h-fit rounded-xl p-1 mx-1 my-1 
              transition-colors duration-200 text-[10pt]
            ${
                type === "Fill"
                    ? "bg-[#CACACA] hover:bg-gray-200"
                    : type === "Border"
                    ? `border-[#CACACA] border-1 bg-none cursor-pointer
                    text-[#CACACA] hover:bg-gray-400 hover:text-[var(--background)]
                    `
                    : "hover:bg-[#CACACA]"
            }
        `}
    >
        {text}
    </div>
)
}

export default Pill;