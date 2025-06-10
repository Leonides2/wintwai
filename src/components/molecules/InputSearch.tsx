import React, { useRef } from "react"

interface InputSeachProps {

    callback?: (tags: string) => void,
    tags: string[]
}

const InputSeach = ({ tags, callback= (event) => console.log(event)}: InputSeachProps) => {
const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === " ") {
            let value = event.currentTarget.value.trim();
            if (!value) return;
            if (tags.includes(value)) return;

            callback(value);
            event.preventDefault(); // Evita que se agregue el espacio al input
            if (inputRef.current) inputRef.current.value = "";
        }
    };
        

    return(
    <>
        <input type="text" 
        ref={inputRef}
        maxLength={64} 
        onKeyDown={handleKeyDown}
        placeholder="Type tags to search..."
        className="bg-[#F0F0F0] rounded-xl px-2.5 py-2 focus:outline-[#b9b9b9] w-full">
        </input>
    </>
    )
}

export default InputSeach