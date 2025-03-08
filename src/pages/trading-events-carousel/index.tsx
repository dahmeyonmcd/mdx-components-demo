import {Card, Divider, Input, ScrollShadow} from "@heroui/react"
import {useEffect, useState} from "react";
import LiveTradingEventCard from "@/pages/trading-events-carousel/components/LiveTradingEventCard";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import moment from "moment/moment";
import {SearchIcon} from "@/pages/reporting/admin/components/ReportingAdminTable";
import {CardBody} from "@heroui/card";

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
        <Card radius={'none'}
            className={"relative bg-black w-screen h-screen flex flex-col items-center start-start px-[0px] overflow-hidden"}>
            <div className={'w-full px-0 pt-0'}>
                <Card className={' dark w-full max-w-full flex flex-row gap-4 items-center justify-start'}>
                    <CardBody className={' dark w-full max-w-full flex flex-row gap-6 items-center justify-start px-4 overflow-y-scroll py-3'}>
                        {DOW.map((day, index) => (
                            <div>
                                <h4 onClick={() => {
                                    dayOfWeekSelection(index)
                                }}
                                    className={`${selectedIndex === index ? 'text-[#FF9900] font-bold' : 'text-white/25'}  cursor-pointer ${selectedIndex === index ? '' : ''}`}>{day}</h4>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>



            <div className={'w-full flex flex-row gap-3 items-center justify-between mt-3 px-0'}>
                <div style={{ fontFamily: 'DarkForest', fontWeight: 400}} className={'text-white text-[15px]'}><span className={'text-[#FF9900]'}>{currentData?.length ?? '0'}</span> EVENTS THIS DAY</div>
                <Input
                    size={'md'}
                    isClearable
                    className="w-full sm:max-w-[24%] dark"
                    placeholder="Search live events"
                    startContent={<SearchIcon color={'#FF9900'} />}
                />
            </div>
            <Divider className={'mt-3 dark'}/>
            <ScrollShadow  className="w-full max-w-full flex flex-row justify-start h-auto gap-3 py-3 overflow-y-scroll scrollbar-hide px-0 bg-black" orientation="horizontal">
                {currentData.map((item, index) => (
                    <LiveTradingEventCard event={item} index={index}/>
                ))}
            </ScrollShadow>

        </Card>
    )
}
