import {twMerge} from 'tailwind-merge';

function Container({className, children}) {
    return (<div className={twMerge("h-full w-full m-0 p-0", className)}>
        {children}
    </div>);
}

export default Container;