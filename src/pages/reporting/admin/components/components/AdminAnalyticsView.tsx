import {Image} from "@heroui/react";

export default function AdminAnalyticsView() {

    return (
        <div className="stats shadow bg-[#282828] flex flex-row px-6 py-4 rounded-[12px]">
            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col '}>
                    <div className="stat-title text-white text-[13px]"><strong>Total Mentors</strong></div>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[#FF9900] text-[25px]">25.6K
                    </div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className="stat-desc text-white text-[13px]">21% more than last month</div>
                </div>
                <div className="stat-figure text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color={'white'}
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
            </div>

            <div className={'h-full w-[1px] bg-[#4E4E4E] mx-5'}/>

            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col '}>
                    <div className="stat-title text-white text-[13px]"><strong>Total Hours</strong></div>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[#FF9900] text-[25px]">25.6K
                    </div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
                         className="stat-desc text-white text-[13px]">21% more than last month
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

            <div className={'h-full w-[1px] bg-[#4E4E4E] mx-5'}/>

            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col justify-start'}>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}} className="stat-value text-[25px] text-white">86%
                    </div>
                    <div className="text-[13px] stat-title text-success">Completed Hours</div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className="stat-desc text-white text-[13px]">31 hours remaining</div>
                </div>
                <div className="stat-figure text-secondary">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <Image radius={'full'} src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}