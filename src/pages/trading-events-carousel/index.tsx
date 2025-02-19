import DemoLayout from "@/layouts/DemoLayout";
import {Tab, Tabs} from "@heroui/tabs";
import {Chip} from "@heroui/chip";
import {Card, CardHeader, CardFooter, Image, Button, Divider} from "@heroui/react"
import {useEffect, useState} from "react";

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
            <div className={'w-full max-w-full flex flex-row gap-8 items-center justify-start px-[40px] overflow-y-scroll'}>
                {DOW.map((day, index) => (
                    <div>
                        <div style={{fontWeight: 900}} onClick={() => handleIndexSelection(index)}
                             className={`${selectedIndex === index ? 'text-white' : 'text-[#878787]'} text-[25px] cursor-pointer ${selectedIndex === index ? '' : ''}`}>{day.toUpperCase()}</div>
                    </div>
                ))}
            </div>

            <Divider className={'my-2 dark'}/>
            <div className={'w-full flex flex-row gap-3 items-center justify-start mt-3 px-[40px]'}>
                {/*<div className={'text-white'}>Filter by:</div>*/}
                {/*<Tabs key={'light'} aria-label="Tabs variants" variant={'light'}>*/}
                {/*    <Tab key="photos" title="Photos"/>*/}
                {/*    <Tab key="music" title="Music"/>*/}
                {/*    <Tab key="videos" title="Videos"/>*/}
                {/*</Tabs>*/}
                <div style={{ fontFamily: 'DarkForest', fontWeight: 400}} className={'text-white text-[15px]'}><span className={'text-[#FF9900]'}>3</span> EVENTS THIS DAY</div>
            </div>
            <Divider className={'my-3 dark'}/>
            <div className={'w-full max-w-full flex flex-row justify-start h-auto gap-10 mt-0 overflow-y-scroll scrollbar-hide px-[40px]'}>
                {[1, 2, 3, 4,5,6,7,8,9,1,2,3,4].map((_, index) => (
                    <div className={'min-w-[280px] max-w-[280px]  h-full bg-[#282828] flex flex-col items-start justify-start px-[5px] pt-[5px] pb-[20px]'}>
                        <div className={'w-full bg-[#FF9900] py-[9px] flex flex-row justify-start items-center px-[20px]'}>
                            <div style={{ fontFamily: 'Pixidot', fontWeight: 400}} className={'text-black text-[16px]'}>Tuesday @ 14:00 PM</div>
                        </div>
                        <Image removeWrapper={true} radius={'none'} src="https://heroui.com/images/card-example-4.jpeg"
                               className={'w-full h-[150px] bg-black mt-[5px] object-cover'}/>
                        <div className={'w-full flex flex-col items-start justify-start px-[20px] py-3 gap-2 mt-2 mb-4'}>
                            <div style={{ fontFamily: 'DarkForest', fontWeight: 400}} className={'text-white text-[21px] leading-[30px]'}>Live Market Updates</div>
                            <div className={'text-[#D1D1D1] text-[15px] leading-[18px]'}>Get more than just spectactular games and innovative
                                hardware. Get the magic experience.
                            </div>
                        </div>
                        <Divider className="my-2 dark" />
                        <div className={'flex flex-row justify-start items-center px-[20px] py-3 gap-2 mt-3'}>
                            <Image removeWrapper={true} radius={'full'}
                                   src="https://heroui.com/images/card-example-4.jpeg"
                                   className={'w-[30px] h-[30px] border-white border-[2px]'}/>
                            <div className={'flex flex-col items-start justify-start gap-0'}>
                                <div style={{ fontWeight: 800 }} className={'text-white text-[13px]'}>Dahmeyon McDonald</div>
                                <div className={'text-[#FF9900] text-[12px]'}>Market Indicator Specialist</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const GalleryIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="24"
            role="presentation"
            viewBox="0 0 24 24"
            width="24"
            {...props}
        >
            <path
                d="M2.58078 19.0112L2.56078 19.0312C2.29078 18.4413 2.12078 17.7713 2.05078 17.0312C2.12078 17.7613 2.31078 18.4212 2.58078 19.0112Z"
                fill="currentColor"
            />
            <path
                d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z"
                fill="currentColor"
            />
            <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const MusicIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="24"
            role="presentation"
            viewBox="0 0 24 24"
            width="24"
            {...props}
        >
            <path
                d="M9.66984 13.9219C8.92984 13.9219 8.33984 14.5219 8.33984 15.2619C8.33984 16.0019 8.93984 16.5919 9.66984 16.5919C10.4098 16.5919 11.0098 15.9919 11.0098 15.2619C11.0098 14.5219 10.4098 13.9219 9.66984 13.9219Z"
                fill="currentColor"
            />
            <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.12 9.8C17.12 10.41 16.86 10.95 16.42 11.27C16.14 11.47 15.8 11.58 15.44 11.58C15.23 11.58 15.02 11.54 14.8 11.47L12.51 10.71C12.5 10.71 12.48 10.7 12.47 10.69V15.25C12.47 16.79 11.21 18.05 9.67 18.05C8.13 18.05 6.87 16.79 6.87 15.25C6.87 13.71 8.13 12.45 9.67 12.45C10.16 12.45 10.61 12.59 11.01 12.8V8.63V8.02C11.01 7.41 11.27 6.87 11.71 6.55C12.16 6.23 12.75 6.15 13.33 6.35L15.62 7.11C16.48 7.4 17.13 8.3 17.13 9.2V9.8H17.12Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const VideoIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="24"
            role="presentation"
            viewBox="0 0 24 24"
            width="24"
            {...props}
        >
            <path d="M14.7295 2H9.26953V6.36H14.7295V2Z" fill="currentColor" />
            <path d="M16.2305 2V6.36H21.8705C21.3605 3.61 19.3305 2.01 16.2305 2Z" fill="currentColor" />
            <path
                d="M2 7.85938V16.1894C2 19.8294 4.17 21.9994 7.81 21.9994H16.19C19.83 21.9994 22 19.8294 22 16.1894V7.85938H2ZM14.44 16.1794L12.36 17.3794C11.92 17.6294 11.49 17.7594 11.09 17.7594C10.79 17.7594 10.52 17.6894 10.27 17.5494C9.69 17.2194 9.37 16.5394 9.37 15.6594V13.2594C9.37 12.3794 9.69 11.6994 10.27 11.3694C10.85 11.0294 11.59 11.0894 12.36 11.5394L14.44 12.7394C15.21 13.1794 15.63 13.7994 15.63 14.4694C15.63 15.1394 15.2 15.7294 14.44 16.1794Z"
                fill="currentColor"
            />
            <path d="M7.76891 2C4.66891 2.01 2.63891 3.61 2.12891 6.36H7.76891V2Z" fill="currentColor" />
        </svg>
    );
};