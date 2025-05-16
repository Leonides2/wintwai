import { useEffect, useRef, useState } from "react";

interface DeletablePillProps {
    text: string,
    id: string
    callback: (tag: string) => void
}


const DeletablePill = ({id,text, callback}: DeletablePillProps) => {

    const [isActive, setIsActive] = useState<boolean>(false)
     const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleDelete = () =>{
        let pill = document.getElementById(id)

        if(!pill) return

        pill.setAttribute("style", "animation: deletedBubble; animation-duration: 350ms")

        timerRef.current = setTimeout(() => {
            callback(text)
        }
        , 300);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    
    
    
    return(
    <>
        <div id={id}
            className={`bg-[#CACACA] 
                *:text-[#4B4848] 
                flex p-2 w-fit h-fit rounded-xl 
                transition-all duration-500 ease-in-out
                cursor-pointer
                `}
            
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={handleDelete}
        >
            <div>{text}</div>
            <div
                className={`
                    transition-all duration-500 ease-in-out
                    overflow-hidden
                    ${isActive ? "opacity-100 w-4 ml-2" : "opacity-0 w-0 ml-0"}
                `}
                style={{ display: "flex", alignItems: "center" }}
            >
                x
            </div>
        </div>
    </>
    )
}

export default DeletablePill;