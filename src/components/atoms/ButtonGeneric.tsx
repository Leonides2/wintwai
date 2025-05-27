import { ReactNode } from "react"

interface ButtonProps{
    children: ReactNode
    callback?: () => void
}

const ButtonGeneric = ({children, callback= () => {}}: ButtonProps) => {

    return(
    <>
        <div className="
        h-fit w-fit p-3 bg-[#F0F0F0] 
        hover:bg-[#dedede]
        outline-[#b9b9b9] rounded-xl
        *:text-[#B5A7A7]
        **:stroke-[#B5A7A7]
        *:cursor-pointer
        transition-colors
        duration-300
        cursor-pointer
        "
        onClick={callback}
        >
            {children}
        </div>
    </>
    )
}
export default ButtonGeneric