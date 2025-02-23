import {useEffect, useState} from "react";
import CreateEventDialog from "@/pages/admin-calendar/components/CreateEventDialog";
import {Card, Divider} from "@heroui/react";
import {CardBody} from "@heroui/card";

interface Props {
    events: any[],
    triggerModal: (event?: any) => void,
    triggeredDate: (date: any) => void,
    modalOpen: boolean,
}

export default function Calendar({ events, triggerModal, modalOpen, triggeredDate }: Props) {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedDateOBJ, setSelectedDateOBJ] = useState<Date | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [showEventForm, setShowEventForm] = useState(false);


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        generateCalendar(currentYear, currentMonth);
    }, [currentYear, currentMonth]);

    const renderEventsForDay = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day);

        const filteredEvents = (events ?? []).filter((event) => (new Date(event.date).getDate() === selectedDate.getDate() && new Date(event.date).getMonth() === selectedDate.getMonth() && new Date(event.date).getFullYear() === selectedDate.getFullYear()));
        if (filteredEvents.length === 0) {
            return (
                <div onClick={() => {
                    setSelectedDateOBJ(selectedDate)
                    triggeredDate(selectedDate)
                }} className={'w-full h-[90%] flex-col flex-shrink flex items-start justify-start'}>
                    <p className={'text-[#B5B5B5] text-[14px]'}><strong>No Events</strong></p>
                    <p style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-[#878787] text-[13px]'}>Tap to add new</p>
                </div>
            )
        } else {
            return (
                <Card radius={'md'} isPressable={true} shadow={'sm'} onPress={() => {
                    console.log(selectedDate)
                    setSelectedDateOBJ(selectedDate)
                    triggeredDate(selectedDate)
                }} className={'w-full h-full flex flex-col items-start justify-start'}>
                    <CardBody
                        className={'w-full h-auto flex flex-col items-start justify-start cursor-pointer'}>
                        {/*<div style={{fontFamily: 'Pixidot', fontWeight: 400}}*/}
                        {/*     className="w-full text-white text-[13px]"*/}
                        {/*     onClick={() => {*/}
                        {/*         console.log(selectedDate)*/}
                        {/*         setSelectedDateOBJ(selectedDate)*/}
                        {/*         triggeredDate(selectedDate)*/}
                        {/*     }}*/}
                        {/*>*/}
                        {/*    <strong>{filteredEvents.length}</strong> Events*/}
                        {/*</div>*/}
                        {/*<div className={'flex flex-row justify-start items-center pt-1 gap-3 mt-0 px-3 pb-2'}>*/}
                        {/*    <div className={'flex flex-col items-start justify-start gap-1'}>*/}
                        {/*        <div style={{fontWeight: 800}} className={'text-[#FF9900] text-[11px]'}>See more</div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <p className="text-tiny text-white font-bold"><span style={{fontFamily: 'DarkForest', fontWeight: 400}} className={'text-[#FF9900] text-[11px]'}>{filteredEvents.length}</span> Live Events</p>
                        <small className="text-default-500">Tap to expand</small>
                    </CardBody>
                </Card>
            )
            // return filteredEvents
            //     .filter((event) => new Date(event.date).getDate() === day)
            //     .map((event) => (
            //         <div className={'border w-full h-auto flex flex-col items-start justify-start bg-black rounded mb-2 shadow cursor-pointer'}>
            //             <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
            //                  key={event.id}
            //                  className="px-3 pt-2 w-full text-white text-[13px]"
            //                  onClick={() => {
            //                      triggerModal(event)
            //                  }}
            //             >
            //                 {event.title}
            //             </div>
            //             <div className={'flex flex-row justify-start items-center pt-1 gap-3 mt-0 px-3 pb-2'}>
            //                 <div className={'flex flex-col items-start justify-start gap-1'}>
            //                     <div style={{fontWeight: 800}} className={'text-[#FF9900] text-[11px]'}>Dahmeyon McDonald</div>
            //                 </div>
            //             </div>
            //         </div>
            //     ));
        }

    };

    const generateCalendar = (year: number, month: number) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const firstDayOfWeek = firstDayOfMonth.getDay();

        const calendarDays = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarDays.push(null);
        }

        // Generate boxes for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(day);
        }

        return calendarDays;
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDayClick = (day: number) => {
        // // const selectedDate = new Date(currentYear, currentMonth, day);
        // // const formattedDate = selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        // // setSelectedDate(formattedDate);
        // const foundEvents = events.filter((event) => new Date(event.date).getDate() === day)
        // if (foundEvents.length === 0) {
        //     triggerModal()
        // } else {
        //     if (!selectedEvent) {
        //         triggerModal()
        //     }
        // }
    };

    useEffect(() => {

    }, [selectedDateOBJ]);

    return (
        <>
            <div className="w-[60%] h-screen">
                <div className="bg-[#0F0F0F] shadow-lg overflow-hidden max-h-screen">
                    <div
                        className={'w-full bg-[#FF9900] py-[6px] flex flex-row justify-between items-center px-[20px] flex-grow-0'}>
                        <div onClick={handlePrevMonth} className={'w-[20px] h-[30px] bg-black'}></div>
                        <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-black text-[18px]'}>
                            {`${monthNames[currentMonth]} ${currentYear}`}
                        </div>
                        <div onClick={handleNextMonth} className={'w-[20px] h-[30px] bg-black'}></div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-2 p-4">
                            {daysOfWeek.map((day) => (
                                <div style={{fontFamily: 'DarkForest', fontWeight: 400}} key={day}
                                     className={`text-center font-semibold text-white text-[15px]`}>{day}</div>
                            ))}
                        </div>
                        <Divider className={'dark'}/>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-4">

                        {generateCalendar(currentYear, currentMonth).map((day, index) => (
                            day ? (
                                // <div
                                //     key={index}
                                //     className={`text-center py-2 border cursor-pointer ${new Date().getDate() === day && new Date().getMonth() === currentMonth ? 'bg-blue-500 text-white' : ''}`}
                                //     onClick={() => handleDayClick(day)}
                                // >
                                //     {day}
                                // </div>
                                <Card isPressable={true} shadow={'sm'} radius={'md'} className={'dark'} onPress={() => handleDayClick(day)} key={day}>
                                    <CardBody className={`p-2 min-h-[100px] ${selectedDateOBJ?.toDateString() === new Date(currentYear, currentMonth, day).toDateString() ? '' : ''}`}>
                                        <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                                             className={`${new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString() ? 'text-[#FF9900]' : 'text-white'} text-[18px] font-bold  mb-0`}>{day}
                                        </div>
                                        {renderEventsForDay(day)}
                                    </CardBody>
                                </Card>
                            ) : (
                                <div key={index}></div>
                            )
                        ))}
                    </div>
                    {selectedDate && (
                        <div className="modal fixed inset-0 flex items-center justify-center z-50">
                            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
                            <div
                                className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <p className="text-2xl font-bold">Selected Date</p>
                                        <button onClick={() => setSelectedDate(null)}
                                                className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕
                                        </button>
                                    </div>
                                    <div className="text-xl font-semibold">{selectedDate}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
