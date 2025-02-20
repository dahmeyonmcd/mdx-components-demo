import React, {useState} from "react";
import {
    Form,
    Button,
    DatePicker,
    ModalHeader, ModalFooter, TimeInput, Divider, Modal, ModalContent, ModalBody, DateInput
} from "@heroui/react";
import {now, parseZonedDateTime, getLocalTimeZone, parseAbsoluteToLocal} from "@internationalized/date";
import NetworkingAPI from "@/helpers/NetworkingAPI";

interface Props {
    data?: any,
    timesheet?: any,
    open: boolean;
    onClose: () => void;
    handleCancel: () => void,
    onSuccess: () => void,
}

export default function UpdateTimesheetDialog({ open, onClose, handleCancel, data, timesheet, onSuccess }: Props) {

    const [submitted, setSubmitted] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [start_timestamp, setStartTimestamp] = useState<any | null>(null);
    const [end_timestamp, setEndTimestamp] = useState<any | null>(null);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            console.log(start_timestamp);
            console.log(end_timestamp);
            const payload = {
                timesheet_id: timesheet?.timesheet?.id,
                start_timestamp,
                end_timestamp,
            }
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/instructor/report/update', 'POST', payload);
            console.log(dataResponse);
            // onSuccess()
        } catch (error) {
            console.error(error);
        }
        // setSubmitted(data);
    };

    return(
        <Modal isOpen={open} className="" onOpenChange={(isOpen: boolean) => isOpen ? handleCancel() : {}} onClose={() => handleCancel()}>
            <ModalContent>
                <Form onSubmit={onSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Update Timesheet</ModalHeader>
                    <ModalBody className={'flex flex-col w-full'}>
                        <DateInput hideTimeZone={false} granularity={'minute'} isDisabled={timesheet ? !!timesheet?.timesheet?.clock_in : false} defaultValue={timesheet?.timesheet.clock_in ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_in).toISOString()) : timesheet?.timesheet?.clock_in} onChange={(event) => setStartTimestamp(event?.toDate('UTC').toUTCString())} isRequired={true} errorMessage={'Please enter a valid start date'}
                                   className="w-full" fullWidth={true} label="Session start time" placeholderValue={now(getLocalTimeZone())}/>
                        <DateInput granularity={'minute'} isRequired={true} isDisabled={timesheet ? !!timesheet?.timesheet?.clock_out : false} defaultValue={timesheet?.timesheet.clock_out ? parseAbsoluteToLocal(new Date(timesheet?.timesheet?.clock_out).toISOString()) : timesheet?.timesheet?.clock_out} onChange={(event) => setEndTimestamp(event?.toDate('UTC').toUTCString())} errorMessage={'Please enter a valid end date'}
                                   className="w-full" fullWidth={true} label="Session end time" placeholderValue={now(getLocalTimeZone())}/>
                    </ModalBody>
                    <ModalFooter className={'flex flex-col'}>
                        <div className={'w-full flex flex-col gap-3'}>
                            <Divider className={''}/>
                            <p className="text-tiny text-default-400">
                                When creating a live streaming event it is important to obtain a <strong>Vimeo Event
                                ID</strong> to view in platform
                            </p>
                        </div>
                        <div className={'flex flex-col gap-3 mt-2'}>
                            <Button isDisabled={(!!timesheet?.timesheet?.clock_in) && (!!timesheet?.timesheet?.clock_out)} className={'w-full'} fullWidth={true} isLoading={isLoading} type="submit" variant="flat"
                                    color={'default'}>
                                Save changes
                            </Button>
                            <Button isDisabled={(!!timesheet?.timesheet?.clock_in) && (!!timesheet?.timesheet?.clock_out)} fullWidth={true} isLoading={isLoading} type="submit" size={'md'} variant="solid"
                                    color={'warning'}>
                                Submit For Review
                            </Button>
                        </div>

                        {submitted && (
                            <div className="text-small text-default-500">
                                You submitted: <code>{JSON.stringify(submitted)}</code>
                            </div>
                        )}
                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )

}

export const animals = [
    {key: "cat", label: "Cat"},
    {key: "dog", label: "Dog"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
    {key: "tiger", label: "Tiger"},
    {key: "giraffe", label: "Giraffe"},
    {key: "dolphin", label: "Dolphin"},
    {key: "penguin", label: "Penguin"},
    {key: "zebra", label: "Zebra"},
    {key: "shark", label: "Shark"},
    {key: "whale", label: "Whale"},
    {key: "otter", label: "Otter"},
    {key: "crocodile", label: "Crocodile"},
];