
import Calendar from "./components/Calendar";
import TradingEventSlot from "@/pages/admin-calendar/components/TradingEventSlot";
import {Divider} from "@heroui/react";
import CreateEventDialog from "@/pages/admin-calendar/components/CreateEventDialog";
import {useState} from "react";

const events = [
    { id: 1, title: 'Live Market Updates', date: '2025-02-10', description: 'Discuss project timelines.' },
    { id: 1, title: 'Live Market Updates', date: '2025-02-20', description: 'Discuss project timelines.' },
    { id: 1, title: 'Live Market Updates', date: '2025-02-15', description: 'Discuss project timelines.' },
    { id: 1, title: 'Live Market Updates', date: '2025-02-15', description: 'Discuss project timelines.' },
    { id: 1, title: 'Live Market Updates', date: '2025-02-15', description: 'Discuss project timelines.' },
    { id: 2, title: 'Doctor Appointment', date: '2025-02-18', description: '', recurring: true },
];

export default function Page() {

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [filteredEvents, setFilteredEvents] = useState<any[] | null>(null);

    function handleEventSelection(event?: any) {
        if (event) {
            setSelectedEvent(event);
        }
        setShowModal(true);
    }

    function handleDateSelection(date: Date) {
        // const formattedDate = date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        // console.log(date);
        setSelectedDate(date)
        const parsedFilteredEvents = events.filter((event) => (new Date(event.date).getDate() === date.getDate() && new Date(event.date).getMonth() === date.getMonth() && new Date(event.date).getFullYear() === date.getFullYear()));
        setFilteredEvents(parsedFilteredEvents);
    }

    return (
        <>
            <div className="bg-black flex flex-row items-start justify-start h-screen gap-3">
                <Calendar events={events} modalOpen={showModal} triggerModal={() => {}} triggeredDate={(date) => handleDateSelection(date)}/>
                <div
                    className={'w-[40%] h-screen max-h-screen overflow-y-scroll scrollbar-hide flex flex-col justify-start items-start px-2'}>
                    <div className={'w-full flex flex-row gap-3 items-center justify-start mt-3 px-[0px] pt-[0px]'}>
                        <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                             className={'text-white text-[15px]'}><span
                            className={'text-[#FF9900]'}>{filteredEvents?.length}</span> EVENTS THIS DAY
                        </div>
                    </div>
                    <Divider className={'dark my-4'}/>
                    {(filteredEvents ?? []).length > 0 ? (
                        <>
                            {filteredEvents?.map((item, i: number) => (
                                <TradingEventSlot event={item} handleSelection={handleEventSelection} index={i}/>
                            ))}
                        </>
                    ) : (
                        <div onClick={() => handleEventSelection()}
                             className="px-3 py-6 h-auto bg-[#0F0F0F] w-full">
                            <div
                                 className={'w-full h-[90%] flex-col flex-shrink flex items-start justify-start'}>
                                <p className={'text-[#B5B5B5] text-[18px]'}><strong>No Events Scheduled For This Day</strong></p>
                                <p style={{fontFamily: 'Pixidot', fontWeight: 400}}
                                   className={'text-[#878787] text-[15px]'}>Tap to add new</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showModal && (
                <CreateEventDialog event={selectedEvent} open={!!selectedEvent} onClose={() => {
                    setSelectedEvent(null)
                    setShowModal(false)
                }} handleCancel={() => {
                    setSelectedEvent(null)
                    setShowModal(false)
                }}/>
            )}
        </>
    );

}