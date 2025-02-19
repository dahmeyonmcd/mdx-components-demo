import {useState} from "react";
import CreateEventDialog from "@/pages/admin-calendar/components/CreateEventDialog";
import {Button} from "@heroui/react";

const events = [
    { id: 1, title: 'Live Market Updates', date: '2023-10-10', description: 'Discuss project timelines.' },
    { id: 1, title: 'Live Market Updates', date: '2023-10-10', description: 'Discuss project timelines.' },
    { id: 1, title: 'Live Market Updates', date: '2023-10-10', description: 'Discuss project timelines.' },
    { id: 2, title: 'Doctor Appointment', date: '2023-10-11', description: '', recurring: true },
    // Add more dummy events here
];

export default function AdminCalendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [showEventForm, setShowEventForm] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const changeMonth = (direction: string) => {
        if (direction === 'prev') {
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
            if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
            if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
        }
    };

    const getMonthName = (month: number) =>
        new Date(currentYear, month).toLocaleString('default', { month: 'long' });

    const daysArray = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

    const renderEventsForDay = (day: number) => {
        const filteredEvents = events.filter((event) => new Date(event.date).getDate() === day)
        if (filteredEvents.length === 0) {
            return (
                <div className={'w-full h-[90%] flex-col flex-shrink flex items-start justify-start'}>
                    <p className={'text-[#B5B5B5] text-[14px]'}><strong>No Events Scheduled</strong></p>
                    <p style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-[#878787] text-[13px]'}>Tap to add new</p>
                </div>
            )
        } else {
            return filteredEvents
                .filter((event) => new Date(event.date).getDate() === day)
                .map((event) => (
                    <div className={'border w-full h-auto flex flex-col items-start justify-start bg-black rounded mb-2 shadow cursor-pointer'}>
                        <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
                             key={event.id}
                             className="px-3 pt-2 w-full text-white text-[13px]"
                             onClick={() => {
                                 setSelectedEvent(event)
                                 setShowModal(true)
                             }}
                        >
                            {event.title}
                        </div>
                        <div className={'flex flex-row justify-start items-center pt-1 gap-3 mt-0 px-3 pb-2'}>
                            <div className={'flex flex-col items-start justify-start gap-1'}>
                                <div style={{fontWeight: 800}} className={'text-[#FF9900] text-[11px]'}>Dahmeyon McDonald</div>
                            </div>
                        </div>
                    </div>
                ));
        }

    };

    function handleDaySelection(day: number) {
        const foundEvents = events.filter((event) => new Date(event.date).getDate() === day)
        if (foundEvents.length === 0) {
            setShowModal(true)
        } else {
            if (!selectedEvent) {
                setShowModal(true)
            }
        }
    }

    const handleEventFormSubmit = (e: any) => {
        e.preventDefault();
        setShowEventForm(false);
    };

    return (
        <>
            <div className="p-4 bg-black h-screen overflow-y-scroll flex flex-col justify-between">
                <div
                    className={'w-full bg-[#FF9900] py-[8px] flex flex-row justify-between items-center px-[20px] flex-grow-0'}>
                    <div onClick={() => changeMonth('prev')} className={'w-[20px] h-[30px] bg-black'}></div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-black text-[20px]'}>
                        {getMonthName(currentMonth).toUpperCase()} {currentYear}
                    </div>
                    <div onClick={() => changeMonth('next')} className={'w-[20px] h-[30px] bg-black'}></div>
                </div>

                <div className="grid grid-cols-7 gap-4 mt-3 h-full flex-shrink">
                    {daysArray.map((day) => (
                        <div onClick={() => handleDaySelection(day)} key={day}
                             className="p-2 min-h-[60px] bg-[#282828]">
                            <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                                 className="text-[22px] font-bold text-white mb-0">{day}
                            </div>
                            {renderEventsForDay(day)}
                        </div>
                    ))}
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

            {showEventForm && (
                <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <form
                        className="bg-white p-6 rounded"
                        onSubmit={handleEventFormSubmit}
                    >
                        <input
                            className="border p-2 mb-2 w-full"
                            type="text"
                            placeholder="Event Title"
                            required
                        />
                        <textarea
                            className="border p-2 mb-2 w-full"
                            placeholder="Event Description"
                        ></textarea>
                        <input
                            className="border p-2 mb-2 w-full"
                            type="date"
                            required
                        />
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white px-2 py-1 rounded" type="button"
                                    onClick={() => setShowEventForm(false)}>Cancel
                            </button>
                            <button className="bg-green-500 text-white px-2 py-1 rounded" type="submit">Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )

}

export const CameraIcon = ({fill = "currentColor", size, height, width, ...props}: any) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
};