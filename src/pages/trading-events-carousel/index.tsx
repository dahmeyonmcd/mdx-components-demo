import DemoLayout from "@/layouts/DemoLayout";
import {Tab, Tabs} from "@heroui/tabs";
import {Chip} from "@heroui/chip";
import {Card, CardHeader, CardFooter, Image, Button, Divider} from "@heroui/react"
import {useEffect, useState} from "react";
import LiveTradingEventCard from "@/pages/trading-events-carousel/components/LiveTradingEventCard";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import moment from "moment/moment";

export default function Calendar() {

    const [selectedIndex, setSelectedIndex] = useState(new Date().getDay());

    const [data, setData] = useState<any[]>([]);
    const [currentData, setCurrentData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function handleIndexSelection(index: number) {
        setSelectedIndex(index)
    }

    async function initializePage() {
        try {
            const payload = { client_id: "mdx-portal", component: "carousel" }
            const tokenResponse = await NetworkingAPI.fetchDataFullResponse('auth/token/web-components/refresh', 'POST', payload, undefined);
            if (tokenResponse?.status === 201) {
                const token = tokenResponse?.response?.result?.token
                const carouselPayload = { month: new Date().getMonth(), year: new Date().getFullYear() }
                const dataResponse = await NetworkingAPI.fetchDataFullResponse('livestream/schedule/calendar', 'POST', carouselPayload, token);
                const dataResult = dataResponse?.response?.result ?? []
                const sorted = dataResult?.sort((a: any, b: any) => new Date(a?.date ?? "").getTime() - new Date(b?.date ?? "").getTime())

                const today = new Date();
                const daysOffset = new Date().getDay() === 0 ? 0 : new Date().getDay(); // How far back to Sunday
                const sundayOfCurrentWeek = new Date(today);
                sundayOfCurrentWeek.setDate(today.getDate() - daysOffset);

                // Generate an array of the current week (Sunday to Saturday)
                const weekDays = Array.from({ length: 7 }, (_, index) => {
                    const day = new Date(sundayOfCurrentWeek);
                    day.setDate(sundayOfCurrentWeek.getDate() + index); // Add 0-6 days to Sunday
                    day.setHours(0, 0, 0, 0);
                    return day;
                });

                const filteredData = sorted.filter((event: any) => {
                    const eventDate = new Date(event?.date);
                    eventDate.setHours(0, 0, 0, 0);
                    return weekDays.some((dow: Date) => dow.toDateString() === eventDate.toDateString());
                });

                setData(filteredData)
                dayOfWeekSelection(new Date().getDay(), filteredData);

                setIsLoading(false)
                setInitialized(true)

            } else {
                console.log('UNAUTHORIZED')
                setIsLoading(false)
                setInitialized(true)
            }
        } catch (e) {
           console.log(e)
            setIsLoading(false)
            setInitialized(true)
        }
    }

    function dayOfWeekSelection(dow: number, innerData?: any) {
        handleIndexSelection(dow)
        const today = new Date();
        const daysOffset = today?.getDay() === 0 ? 0 : today?.getDay();
        const sundayOfCurrentWeek = moment().toDate();
        sundayOfCurrentWeek.setDate(today.getDate() - daysOffset);

        const weekDays = Array.from({ length: 7 }, (_, index) => {
            const day = new Date(sundayOfCurrentWeek);
            day.setDate(sundayOfCurrentWeek.getDate() + index);
            return day;
        });

        const daySelection = weekDays[dow]
        daySelection.setHours(0, 0, 0, 0);

        let currentData;
        if (innerData) {
            currentData = innerData;
        } else {
            currentData = data
        }

        if (currentData?.length > 0) {
            const currentSelection = currentData.filter((event: any) => {
                const eventDate = moment(event?.date).local().toDate();
                eventDate.setHours(0, 0, 0, 0);
                return eventDate.getTime() === daySelection.getTime();
            })

            setCurrentData(currentSelection)
        } else {
            setCurrentData([])
        }
    }

    useEffect(() => {
        initializePage()
    },[])

    return (
        <div
            className={"relative bg-black w-screen h-screen flex flex-col items-center start-start px-[0px]"}>
            <div className={'w-full max-w-full flex flex-row gap-8 items-center justify-start px-[0px] overflow-y-scroll'}>
                {DOW.map((day, index) => (
                    <div>
                        <div style={{fontWeight: 900}} onClick={() => {
                            dayOfWeekSelection(index)
                        }}
                             className={`${selectedIndex === index ? 'text-white' : 'text-[#878787]'} text-[22px] cursor-pointer ${selectedIndex === index ? '' : ''}`}>{day.toUpperCase()}</div>
                    </div>
                ))}
            </div>

            <Divider className={'my-2 dark'}/>
            <div className={'w-full flex flex-row gap-3 items-center justify-start mt-3 px-[0px]'}>
                <div style={{ fontFamily: 'DarkForest', fontWeight: 400}} className={'text-white text-[15px]'}><span className={'text-[#FF9900]'}>{currentData?.length ?? '0'}</span> EVENTS THIS DAY</div>
            </div>
            <Divider className={'my-3 dark'}/>
            <div className={'w-full max-w-full flex flex-row justify-start h-auto gap-3 mt-1 overflow-y-scroll scrollbar-hide px-[0px]'}>
                {currentData.map((item, index) => (
                    <LiveTradingEventCard event={item} index={index}/>
                ))}
            </div>
        </div>
    )
}
