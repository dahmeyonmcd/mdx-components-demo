import {Divider, Image} from "@heroui/react";

interface Props {
    index: number;
    event: any,
    handleSelection: (event: any) => void,
}

export default function TradingEventSlot({ index, handleSelection, event }: Props) {

    return (
        <div onClick={() => handleSelection(event)} key={index}
             className={'w-full bg-[#282828] flex flex-col items-start justify-start px-[5px] pt-[5px] pb-[5px] mb-2 cursor-pointer'}>
            <div className={'w-full bg-[#FF9900] py-[5px] flex flex-row justify-start items-center px-2'}>
                <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-black text-[14px]'}>Tuesday @
                    14:00 PM
                </div>
            </div>
            <div className={'flex flex-row w-full flex-shrink-0 gap-2'}>
                <Image removeWrapper={true} radius={'none'} src="https://heroui.com/images/card-example-4.jpeg"
                       className={'w-[190px] h-[150px] bg-black mt-[5px] object-cover'}/>
                <div className={'w-full flex flex-col items-start justify-start px-2 py-3 gap-1 mt-0 mb-0'}>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className={'text-white text-[18px] leading-[30px]'}>Live Market Updates
                    </div>
                    <div className={'text-[#D1D1D1] text-[13px] leading-[18px]'}>Get more than just spectactular games
                        and
                        innovative
                        hardware. Get the magic experience.
                    </div>
                    <Divider className={'dark mt-2'}/>
                    <div className={'flex flex-row justify-start items-center px-0 py-3 gap-0 mt-0'}>
                        {/*<Image removeWrapper={true} radius={'full'}*/}
                        {/*       src="https://heroui.com/images/card-example-4.jpeg"*/}
                        {/*       className={'w-[30px] h-[30px] border-white border-[2px]'}/>*/}
                        <div className={'flex flex-col items-start justify-start gap-0'}>
                            <div style={{fontWeight: 800}} className={'text-white text-[12px]'}>Dahmeyon McDonald</div>
                            <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className={'text-[#FF9900] text-[12px]'}>Market Indicator Specialist</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}