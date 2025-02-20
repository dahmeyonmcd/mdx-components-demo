"use client"

import ReportingAdminTable from "@/pages/reporting/admin/components/ReportingAdminTable";
import AdminAnalyticsView from "@/pages/reporting/admin/components/components/AdminAnalyticsView";
import {useEffect, useState} from "react";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import TimesheetDecisionDialog from "@/pages/reporting/admin/components/TimesheetDecisionDialog";

export default function Page() {

    const [metrics, setMetrics] = useState<any | undefined>(undefined);
    const [data, setData] = useState<any[] | undefined>(undefined);

    const [selectedTimesheet, setSelectedTimesheet] = useState<any | undefined>(undefined);
    const [approvalModalShowing, setApprovalModalShowing] = useState<boolean>(false);
    const [rejectionModalShowing, setRejectionModalShowing] = useState<boolean>(false);

    async function initializePage() {
        try {
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/admin/retrieve', 'POST', undefined, undefined)
            const retrieved_metrics = dataResponse?.response?.metrics
            const result = dataResponse?.response?.result
            if (result && retrieved_metrics) {
                setMetrics(retrieved_metrics)
                setData(result)
            } else {
                setMetrics(undefined)
                setData([])
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function handleEntryApproval(entry: any) {

        setSelectedTimesheet(entry)
        setApprovalModalShowing(true)
    }

    async function handleEntryRejection(entry: any) {
        setSelectedTimesheet(entry)
        setRejectionModalShowing(true)
    }

    function handleError(message: any) {
        console.log(message)
    }

    useEffect(() => {
        initializePage();
    }, [])

    return(
        <>
            <div className={'relative bg-black w-screen h-screen flex flex-col items-start justify-start px-[0px]'}>
                <AdminAnalyticsView metrics={metrics} />
                <ReportingAdminTable onError={() => {
                }} onSuccess={() => initializePage()} data={data ?? []} isLoading={data === undefined}
                                     handleApprove={(e) => handleEntryApproval(e)}
                                     handleDeny={(e) => handleEntryRejection(e)}/>
            </div>
            {approvalModalShowing && (
                <TimesheetDecisionDialog timesheet={selectedTimesheet} open={approvalModalShowing} onClose={() => {
                    setSelectedTimesheet(undefined)
                    setApprovalModalShowing(false)
                }} handleCancel={() => {
                    setSelectedTimesheet(undefined)
                    setApprovalModalShowing(false)
                }} onSuccess={async () => {
                    await initializePage()
                    setApprovalModalShowing(false)
                }} onError={handleError} />
            )}
            {/*{rejectionModalShowing && (*/}
            {/*    */}
            {/*)}*/}
        </>
    )

}
