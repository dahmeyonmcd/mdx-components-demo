"use client"

import ReportingAdminTable from "@/pages/reporting/admin/components/ReportingAdminTable";
import {useEffect, useState} from "react";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import MentorAnalyticsView from "@/pages/reporting/mentor/components/MentorAnalyticsView";
import ReportingMentorTable from "@/pages/reporting/mentor/components/ReportingMentorTable";
import CreateEventDialog from "@/pages/admin-calendar/components/CreateEventDialog";
import CreateTimesheetDialog from "@/pages/reporting/mentor/components/CreateTimesheetDialog";
import UpdateTimesheetDialog from "@/pages/reporting/mentor/components/UpdateTimesheetDialog";
import {CancellationPromptDialog} from "@/pages/reporting/mentor/components/CancellationPromptDIalog";

export default function Page() {

    const [showTimesheetModal, setTimesheetShowModal] = useState(false);
    const [showEditTimesheetModal, setEditTimesheetShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const [selectedTimesheet, setSelectedTimesheet] = useState<any | null>(null);

    const [mentorData, setMentorData] = useState<any | undefined>(undefined);
    const [data, setData] = useState<any[] | undefined>(undefined);

    async function initializePage() {
        setData(undefined);
        setMentorData(undefined);
        try {
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/instructor/overview/retrieve', 'POST', { instructor_id: 8 }, undefined);
            console.log(dataResponse)
            const result = dataResponse?.response?.live_sessions
            if (result) {
                setData(result)
            } else {
                setData([])
            }
        } catch (error) {
            console.error(error)
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
                <MentorAnalyticsView/>
                <ReportingMentorTable handleCreateNew={() => setTimesheetShowModal(true)} data={data ?? []} isLoading={data === undefined} handleSelection={handleTimesheetSelection}/>
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
                <UpdateTimesheetDialog timesheet={selectedTimesheet} open={!!selectedTimesheet} onClose={() => {
                    setSelectedTimesheet(null);
                    setTimesheetShowModal(false);
                }} handleCancel={() => {
                    setSelectedTimesheet(null);
                    setTimesheetShowModal(false);
                }} onSuccess={() => initializePage()}/>
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
