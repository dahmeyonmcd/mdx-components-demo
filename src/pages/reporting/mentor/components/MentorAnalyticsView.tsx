import {Image} from "@heroui/react";

export default function MentorAnalyticsView() {

    return (
        <div className="stats shadow bg-[#282828] flex flex-row px-6 py-4 rounded-[12px]">
            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col '}>
                    <div className="stat-title text-white text-[13px]"><strong>Hours This Month</strong></div>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[#FF9900] text-[25px]">65:00 hrs
                    </div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className="stat-desc text-white text-[13px]">You've met your threshold</div>
                </div>

            </div>

            <div className={'h-full w-[1px] bg-[#4E4E4E] mx-5'}/>

            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col '}>
                    <div className="stat-title text-white text-[13px]"><strong>Overtime</strong></div>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[#FF9900] text-[25px]">0:20 hrs
                    </div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
                         className="stat-desc text-white text-[13px]">Keep going!
                    </div>
                </div>

            </div>

            <div className={'h-full w-[1px] bg-[#4E4E4E] mx-5'}/>

            <div className="stat flex flex-row items-center justify-start gap-6">
                <div className={'flex flex-col justify-start'}>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[25px] text-success">$3532
                    </div>
                    <div className="text-[13px] stat-title text-white">Total paid</div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
                         className="stat-desc text-white text-[13px]">You're doing great!
                    </div>
                </div>
                <div className="stat-figure text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        color={'white'}
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )

}