import React from "react"

interface InputSeachProps {

    callback?: (tags: string) => void
}

const InputSeach = ({callback= (event) => console.log(event)}: InputSeachProps) => {


    const handleText = (event: React.ChangeEvent<HTMLInputElement>) =>{
        let value = event.target.value;
        if (value === undefined) return

        if(value.includes(" ")){

            if (value.includes("-")){
                value =  value.replace("-"," ")
            }
            callback(value)
            event.target.value = ""
        }
    }
        

    return(
    <>
        <input type="text" 
        maxLength={64} 
        onChange={handleText}
        placeholder="Type tags to search..."
        className="bg-[#F0F0F0] rounded-xl px-2.5 py-2 focus:outline-[#b9b9b9] w-full">
        </input>
    </>
    )
}

export default InputSeach