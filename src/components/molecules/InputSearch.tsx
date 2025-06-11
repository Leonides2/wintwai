import React, { useRef } from "react"

interface InputSeachProps {

    callback?: (tags: string) => void,
    tags: string[]
}

const InputSeach = ({ tags, callback = (event) => console.log(event) }: InputSeachProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    //const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        if (rawValue.includes(" ") && rawValue.trim().length > 0) {
            const value = event.currentTarget.value.trim();
            if (!value) return;
            if (tags.includes(value)) return;

             if(value.includes("-")){
                callback(value.replace("-", " "))
            }else{
                 callback(value);
            }

            event.preventDefault(); // Evita que se agregue el espacio al input
            if (inputRef.current) inputRef.current.value = "";
        }
    };


    return (
        <>
            <input type="text"
                ref={inputRef}
                maxLength={64}
                onChange={handleValue}
                placeholder="Type tags to search..."
                className="bg-[#F0F0F0] rounded-xl px-2.5 py-2 focus:outline-[#b9b9b9] w-full">
            </input>
        </>
    )
}

export default InputSeach