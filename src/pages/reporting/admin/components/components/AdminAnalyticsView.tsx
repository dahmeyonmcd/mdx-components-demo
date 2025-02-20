import {Image} from "@heroui/react";

interface Props {
    metrics?: any
}

export default function AdminAnalyticsView({ metrics }: Props) {

    return (
        <div className="stats shadow bg-[#282828] flex flex-row px-6 py-4 rounded-[12px]">
            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col '}>
                    <div className="stat-title text-white text-[13px]"><strong>Ready For Review</strong></div>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[#FF9900] text-[25px]">{metrics ? metrics?.ready_for_review : '0'}
                    </div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className="stat-desc text-white text-[13px]">{metrics ? metrics?.total_streams : '0'} total streams this month</div>
                </div>
            </div>

            <div className={'h-full w-[1px] bg-[#4E4E4E] mx-5'}/>

            <div className="stat flex flex-row items-center justify-start gap-3">
                <div className={'flex flex-col '}>
                    <div className="stat-title text-white text-[13px]"><strong>Total Streaming Hours</strong></div>
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}}
                         className="stat-value text-[#FF9900] text-[25px]">{metrics ? metrics?.total_hours : '0'} hrs
                    </div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}}
                         className="stat-desc text-white text-[13px]">Great start to the month!
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
                    <div style={{fontFamily: 'DarkForest', fontWeight: 400}} className="stat-value text-[25px] text-white">{metrics?.top_earner ? metrics?.top_earner_sessions : '0'}
                    </div>
                    <div className="text-[13px] stat-title text-success">Most Consistent This Month</div>
                    <div style={{fontFamily: 'Pixidot', fontWeight: 400}} className="stat-desc text-white text-[13px]"><strong>{metrics?.top_earner ? metrics?.top_earner?.name : ''}</strong></div>
                </div>
                <div className="stat-figure text-secondary">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <Image className={'border-white border-3'} radius={'full'} src={metrics?.top_earner?.photo ? `https://mdxalgo.com/storage/${metrics?.top_earner?.photo}` : ''}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}