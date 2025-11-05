import {twMerge} from "tailwind-merge";

function MathInput({className,inputValue, setInputValue}) {
    return (<div className={twMerge("p-10 h-32", className)}>
        <input value={inputValue} className="border-none outline-none text-center w-full h-full"
        onChange={(event)=> {
            setInputValue(event.target.value.replace(/ /g, ""));
        }}/>
    </div>
    ); 
}

export default MathInput;