"use client";

import clsx from "clsx";

import useConversation from "../hook/useConversation";
import EmptyState from "../(site)/components/EmptyState";
import { useEffect, useState } from "react";

const Home = () => {
    const { isOpen } = useConversation()
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     const runTime = setInterval(()=>{
    //         console.log("Internal function running...")
    //         setCount(count + 1)
    //     },1000)

    //     return ()=>{
    //         clearInterval(runTime)
    //     }
    // }, [count]);

    // away new
    useEffect(() => {
        setInterval(()=>{
            setCount((prev)=>prev + 1)
        },1000)
    }, []);

    console.info('count', count)
    return(
        <div className={clsx("lg:pl-80 h-full lg:block", isOpen ? 'block' : 'hidden')}>
            <EmptyState/>
            <div>{count}</div>
        </div>
    )
}
export default Home