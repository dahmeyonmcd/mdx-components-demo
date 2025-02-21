import React, {useEffect, useState} from "react";
import {
    Form,
    Button,
    DatePicker,
    ModalHeader, ModalFooter, TimeInput, Divider, Modal, ModalContent, ModalBody, DateInput, Tooltip, CalendarDate
} from "@heroui/react";
import {
    now,
    parseZonedDateTime,
    getLocalTimeZone,
    parseAbsoluteToLocal,
    ZonedDateTime,
    CalendarDateTime
} from "@internationalized/date";
import NetworkingAPI from "@/helpers/NetworkingAPI";

interface Props {
    data?: any,
    timesheet?: any,
    open: boolean;
    onClose: () => void;
    handleCancel: () => void,
    onSuccess: () => void,
    onError: (message: string) => void,
}

export default function TimesheetDecisionDialog({ open, onClose, handleCancel, onError, timesheet, onSuccess }: Props) {

    const [submitted, setSubmitted] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [start_timestamp, setStartTimestamp] = useState<string | null>(timesheet?.timesheet.clock_in ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_in).toISOString()).toAbsoluteString() : timesheet?.timesheet?.clock_in);
    const [end_timestamp, setEndTimestamp] = useState<string | null>(timesheet?.timesheet.clock_out ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_out).toISOString()).toAbsoluteString() : timesheet?.timesheet?.clock_out);

    const onSubmit = async (e: any) => {
        e.preventDefault();
    };

    async function handleApproval() {
        try {
            await handleAPICallBack('approved')
        } catch (error) {
            console.error(error);
        }
    }

    async function handlRejection() {
        try {
            await handleAPICallBack('denied')
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMoreInfo() {
        try {
            await handleAPICallBack('needs_attention')
        } catch (error) {
            console.error(error);
        }
    }


    async function handleAPICallBack(action: any) {
        try {
            const payload = {
                decision: action,
                timesheet_id: timesheet?.timesheet?.id,
                start_timestamp: start_timestamp?.split('.')[0] + "Z",
                end_timestamp: end_timestamp?.split('.')[0] + "Z"
            }
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/admin/approve-deny', 'POST', payload, undefined)
            const result = dataResponse?.response?.result
            const message = dataResponse?.response?.message
            if (result) {
                onSuccess()
            } else {
                onError(message ?? "Operation failed")
            }
        } catch (error) {
            console.error(error)
        }
    }

    function handleStartTimeSelection(time: ZonedDateTime | CalendarDate | CalendarDateTime | null) {
        if (time) {
            if (time instanceof ZonedDateTime) {
                const timeString = time.toAbsoluteString();
                setStartTimestamp(timeString)
            }
        }
    }

    function handleEndTimeSelection(time: ZonedDateTime | CalendarDate | CalendarDateTime | null) {
        if (time) {
            if (time instanceof ZonedDateTime) {
                const timeString = time.toAbsoluteString()
                console.log(timeString)
                setEndTimestamp(timeString)
            } else {
                console.log(time)
            }
        }
    }

    useEffect(() => {
        if (timesheet) {
            setStartTimestamp(timesheet?.timesheet.clock_in ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_in).toISOString()).toAbsoluteString() : timesheet?.timesheet?.clock_in)
            setEndTimestamp(timesheet?.timesheet.clock_out ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_out).toISOString()).toAbsoluteString() : timesheet?.timesheet?.clock_out)
        }
    },[timesheet])


    return(
        <Modal isOpen={open} className="" onOpenChange={(isOpen: boolean) => isOpen ? handleCancel() : {}} onClose={() => handleCancel()}>
            <ModalContent>
                <Form onSubmit={onSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Timesheet Entry Approval</ModalHeader>
                    <ModalBody className={'flex flex-col w-full'}>
                        <DateInput hideTimeZone={false} granularity={'minute'} defaultValue={timesheet?.timesheet.clock_in ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_in).toISOString()) : timesheet?.timesheet?.clock_in} onChange={(event) => handleStartTimeSelection(event)} isRequired={true} errorMessage={'Please enter a valid start date'}
                                   className="w-full" fullWidth={true} label="Session start time" placeholderValue={now(getLocalTimeZone())}/>
                        <DateInput granularity={'minute'} isRequired={true} defaultValue={timesheet?.timesheet.clock_out ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_out).toISOString()) : timesheet?.timesheet?.clock_out} onChange={(event) => handleEndTimeSelection(event)} errorMessage={'Please enter a valid end date'}
                                   className="w-full" fullWidth={true} label="Session end time" placeholderValue={now(getLocalTimeZone())}/>
                    </ModalBody>
                    <ModalFooter className={'flex flex-col'}>
                        <div className={'w-full flex flex-col gap-3'}>
                            <Divider className={''}/>
                            <p className="text-tiny text-default-400">
                                When making a decision for timesheet requests, always remember that once an approval is granted the status cannot be updated or changed.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-3 mt-2'}>
                            <Tooltip className={'dark'} content={"Notice a problem with the submitted timesheet entries? Click here to request more information from the source mentor."}>
                                <Button onPress={() => handleMoreInfo()} fullWidth={true} isLoading={isLoading} type="submit" size={'md'} variant="solid"
                                        color={'default'}>
                                    More Information Needed
                                </Button>
                            </Tooltip>
                            <Button onPress={() => handlRejection()} className={'w-full'} fullWidth={true} isLoading={isLoading} type="submit" variant="solid"
                                    color={'danger'}>
                                Reject
                            </Button>
                            <Button onPress={() => handleApproval()} fullWidth={true} isLoading={isLoading} type="submit" size={'md'} variant="solid"
                                    color={'warning'}>
                                Approve
                            </Button>
                        </div>
                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )

}