interface PillProps {
    text?: string
}

const Pill = ({text = "[Text]"}: PillProps) => {

    return(
        <div className="bg-[#CACACA] text-[#4B4848] w-fit h-fit ">
            {text}
        </div>
    )
}