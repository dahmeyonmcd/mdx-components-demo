import DemoLayout from "@/layouts/DemoLayout";
import {Tab, Tabs} from "@heroui/tabs";
import {Chip} from "@heroui/chip";
import {Card, CardHeader, CardFooter, Image, Button, Divider} from "@heroui/react"
import {useEffect, useState} from "react";
import LiveTradingEventCard from "@/pages/trading-events-carousel/components/LiveTradingEventCard";

export default function Calendar() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const DOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    function handleIndexSelection(index: number) {
        setSelectedIndex(index)
    }

    useEffect(() => {

    },[])

    return (
        <div
            className={"relative bg-black w-screen h-screen flex flex-col items-center justify-center px-[0px]"}>
            <div className={'w-full max-w-full flex flex-row gap-8 items-center justify-start px-[0px] overflow-y-scroll'}>
                {DOW.map((day, index) => (
                    <div>
                        <div style={{fontWeight: 900}} onClick={() => handleIndexSelection(index)}
                             className={`${selectedIndex === index ? 'text-white' : 'text-[#878787]'} text-[22px] cursor-pointer ${selectedIndex === index ? '' : ''}`}>{day.toUpperCase()}</div>
                    </div>
                ))}
            </div>

            <Divider className={'my-2 dark'}/>
            <div className={'w-full flex flex-row gap-3 items-center justify-start mt-3 px-[0px]'}>
                <div style={{ fontFamily: 'DarkForest', fontWeight: 400}} className={'text-white text-[15px]'}><span className={'text-[#FF9900]'}>3</span> EVENTS THIS DAY</div>
            </div>
            <Divider className={'my-3 dark'}/>
            <div className={'w-full max-w-full flex flex-row justify-start h-auto gap-3 mt-1 overflow-y-scroll scrollbar-hide px-[0px]'}>
                {[1, 2, 3, 4,5,6,7,8,9,1,2,3,4].map((_, index) => (
                    <LiveTradingEventCard index={index}/>
                ))}
            </div>
        </div>
    )
}
