import {Button, Card, CardFooter, CardHeader, Divider, Image} from "@heroui/react";
import moment from "moment";
import {User} from "@heroui/user";
import {CardBody} from "@heroui/card";

interface Props {
    index: number;
    event?: any
}

export default function LiveTradingEventCard({ index, event }: Props) {

    function constructTime() {
        if (event) {
            const utcDate = `${event?.date}T${event?.time}Z`
            const localDate = moment(utcDate).local();
            return localDate.format('dddd [@] h:mm A');
        }
        return "UNKNOWN"
    }

    function generateLink(event: any) {
        const streamId = event?.stream_id;
        if (streamId !== null && streamId !== "" && streamId !== undefined) {
            if (typeof window === "undefined") return; // Ensure it's running on the client

            // const searchParams = new URLSearchParams(window.parent?.location.search);
            // searchParams.set("stream", streamId);
            // const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            const newUrl = `${window.parent?.location.origin}${window.location.pathname}?stream=${streamId}`;
            window.parent?.postMessage({ stream: streamId }, "*");
            console.log(newUrl);
            window.parent.location.href = newUrl;

            //tradingEventsCarouselIframe
        }
    }

    return(
        <Card isPressable shadow="sm" className="py-4 dark w-[270px] min-w-[280px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny text-[#FF9900] uppercase font-bold">{event?.educator_name}</p>
                <small className="text-default-500">{constructTime()}</small>
                <h4 className="font-bold text-large">{event?.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 gap-3">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={`https://mdxalgo.com/storage/${event?.educator_photo}`}
                    width={270} height={240}
                />
                <Button onPress={() => generateLink(event)} variant={'solid'} color={'warning'}>Join Live Stream</Button>
            </CardBody>
        </Card>
    )

    // return (
    //     <div key={index}
    //         className={'min-w-[270px] max-w-[270px] min-h-[300px] h-[470px]  max-h-[470px] bg-[#1B1B1B] rounded-[12px] overflow-hidden flex flex-col items-start justify-between pb-0'}>
    //         <div className={'w-full flex flex-col items-start justify-start'}>
    //             <div className={'w-full px-[0px] pt-[0px]'}>
    //                 <div className={'w-full bg-[#FF9900] py-[9px] flex flex-row justify-start items-center px-3'}>
    //                     <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
    //                          className={'text-black text-[16px]'}>{constructTime()}
    //                     </div>
    //                 </div>
    //             </div>
    //             <Image removeWrapper={true} radius={'none'} src={`https://mdxalgo.com/storage/${event?.educator_photo}`}
    //                    className={'w-full h-[200px] bg-black mt-[0px] object-cover'}/>
    //             <div className={'w-full flex flex-col items-start justify-start px-3 py-3 gap-3 mt-0 mb-2'}>
    //                 <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
    //                      className={'text-white text-[19px] leading-[28px]'}>{event?.title}
    //                 </div>
    //                 <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-[#D1D1D1] text-[13px] leading-[18px]'}>Get more than just spectactular games
    //                     and
    //                     innovative
    //                     hardware. Get the magic experience.
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={'w-full flex flex-col items-start justify-end  pb-2'}>
    //             <Divider className="my-0 dark"/>
    //             <div className={'flex flex-row justify-start items-center px-3 pt-1 gap-2 mt-2 mb-2'}>
    //                 <User
    //                     className={'text-white'}
    //                     avatarProps={{radius: "lg", src: `https://mdxalgo.com/storage/${event?.educator_photo}`}}
    //                     description={
    //                         <p className={'text-[#FF9900]'}>{event?.educator_bio}</p>
    //                     }
    //                     name={event?.educator_name}
    //                 >
    //
    //                 </User>
    //             </div>
    //         </div>
    //     </div>
    // )

}
