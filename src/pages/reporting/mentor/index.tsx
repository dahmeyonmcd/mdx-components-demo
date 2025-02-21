"use client"

import {useEffect, useState} from "react";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import MentorAnalyticsView from "@/pages/reporting/mentor/components/MentorAnalyticsView";
import ReportingMentorTable from "@/pages/reporting/mentor/components/ReportingMentorTable";
import CreateTimesheetDialog from "@/pages/reporting/mentor/components/CreateTimesheetDialog";
import UpdateTimesheetDialog from "@/pages/reporting/mentor/components/UpdateTimesheetDialog";
import CancellationPromptDialog from "@/pages/reporting/mentor/components/CancellationPromptDIalog";

export default function Page() {

    const [showTimesheetModal, setTimesheetShowModal] = useState(false);
    const [showEditTimesheetModal, setEditTimesheetShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const [selectedTimesheet, setSelectedTimesheet] = useState<any | null>(null);

    const [metrics, setMetrics] = useState<any | undefined>(undefined);
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function initializePage() {
        setData([]);
        setIsLoading(true)
        setMetrics(undefined);
        try {
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/instructor/overview/retrieve', 'POST', { instructor_id: 8 }, undefined);
            const result = dataResponse?.response
            if (result) {
                const fetchedSessions = result?.result?.live_sessions
                const fetchedMetrics = result?.metrics
                setMetrics(fetchedMetrics)
                setData(fetchedSessions)
            } else {
                setMetrics(undefined)
                setData([])
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setData([])
            setIsLoading(false)
        }
    }

    function handleTimesheetSelection(selection: any, action: string) {
        if (selection) {
            setSelectedTimesheet(selection);

            if (action === "view") {

            } else if (action === "edit") {
                setEditTimesheetShowModal(true)
            } else if (action === "cancel") {
                setShowCancelModal(true)
            } else {
                console.log('ACTION_NOT_FOUND')
            }
        }
    }

    useEffect(() => {
        initializePage();
    }, [])

    return(
        <>
            <div className={'relative bg-black w-screen h-screen flex flex-col items-start justify-start px-[0px]'}>
                <MentorAnalyticsView metrics={metrics}/>
                <ReportingMentorTable handleCreateNew={() => setTimesheetShowModal(true)} data={data} isLoading={isLoading} handleSelection={handleTimesheetSelection}/>
            </div>

            {showTimesheetModal && (
                <CreateTimesheetDialog event={selectedTimesheet} open={showTimesheetModal} onSuccess={async () => {
                    await initializePage()
                    setTimesheetShowModal(false)
                }} handleCancel={() => {
                    setSelectedTimesheet(null)
                    setTimesheetShowModal(false)
                }}/>
            )}

            {showEditTimesheetModal && (
                <UpdateTimesheetDialog timesheet={selectedTimesheet} open={showEditTimesheetModal} onClose={() => {
                    setSelectedTimesheet(null);
                    setEditTimesheetShowModal(false);
                }} handleCancel={() => {
                    setSelectedTimesheet(null);
                    setEditTimesheetShowModal(false);
                }} onSuccess={async () => {
                    await initializePage()
                    setEditTimesheetShowModal(false);
                }}/>
            )}

            {showCancelModal && (
                <CancellationPromptDialog timesheet={selectedTimesheet} open={showCancelModal} onCancel={() => {
                    setSelectedTimesheet(null);
                    setShowCancelModal(false);
                }} onSuccess={() => initializePage()}/>
            )}
        </>
    )

}
