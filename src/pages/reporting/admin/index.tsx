"use client"

import ReportingAdminTable from "@/pages/reporting/admin/components/ReportingAdminTable";
import AdminAnalyticsView from "@/pages/reporting/admin/components/components/AdminAnalyticsView";
import {useEffect, useState} from "react";
import NetworkingAPI from "@/helpers/NetworkingAPI";

export default function Page() {

    const [data, setData] = useState<any[] | undefined>(undefined);

    async function initializePage() {
        try {
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/admin/retrieve', 'POST', undefined, undefined)
            const result = dataResponse?.response?.result
            if (result) {
                setData(result)
            } else {
                setData([])
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        initializePage();
    }, [])

    return(
        <div className={'relative bg-black w-screen h-screen flex flex-col items-start justify-start px-[0px]'}>
            <AdminAnalyticsView />
            <ReportingAdminTable data={data ?? []} isLoading={data === undefined} />
        </div>
    )

}
