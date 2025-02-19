import {Divider, Image} from "@heroui/react";

interface Props {
    index: number;
}

export default function LiveTradingEventCard({ index }: Props) {

    return (
        <div key={index}
            className={'min-w-[280px] max-w-[280px]  h-full bg-[#282828] flex flex-col items-start justify-start px-[5px] pt-[5px] pb-[20px]'}>
            <div className={'w-full bg-[#FF9900] py-[9px] flex flex-row justify-start items-center px-[20px]'}>
                <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-black text-[16px]'}>Tuesday @
                    14:00 PM
                </div>
            </div>
            <Image removeWrapper={true} radius={'none'} src="https://heroui.com/images/card-example-4.jpeg"
                   className={'w-full h-[220px] bg-black mt-[5px] object-cover'}/>
            <div className={'w-full flex flex-col items-start justify-start px-[20px] py-3 gap-2 mt-2 mb-4'}>
                <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                     className={'text-white text-[21px] leading-[30px]'}>Live Market Updates
                </div>
                <div className={'text-[#D1D1D1] text-[15px] leading-[18px]'}>Get more than just spectactular games and
                    innovative
                    hardware. Get the magic experience.
                </div>
            </div>
            <Divider className="my-2 dark"/>
            <div className={'flex flex-row justify-start items-center px-[20px] py-3 gap-2 mt-3'}>
                <Image removeWrapper={true} radius={'full'}
                       src="https://heroui.com/images/card-example-4.jpeg"
                       className={'w-[30px] h-[30px] border-white border-[2px]'}/>
                <div className={'flex flex-col items-start justify-start gap-0'}>
                    <div style={{fontWeight: 800}} className={'text-white text-[13px]'}>Dahmeyon McDonald</div>
                    <div className={'text-[#FF9900] text-[12px]'}>Market Indicator Specialist</div>
                </div>
            </div>
        </div>
    )

}