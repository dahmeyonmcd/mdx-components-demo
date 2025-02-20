import React, {useEffect, useState} from "react";
import {
    Form,
    Input,
    Button,
    Card,
    DatePicker,
    Select,
    SelectItem,
    CheckboxGroup,
    Checkbox,
    Switch, cn, TimeInput, Divider, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, DateInput
} from "@heroui/react";
import {getLocalTimeZone, now, parseAbsoluteToLocal, parseAbsolute, ZonedDateTime, parseDateTime} from "@internationalized/date";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import {Alert} from "@heroui/alert";

interface Props {
    date?: Date,
    event?: any,
    open: boolean;
    onSuccess: () => void;
    handleCancel: () => void;
}

export default function CreateTimesheetDialog({ open, onSuccess, handleCancel, date, event }: Props) {

    const [sessions, setSessions] = useState<any[]>([]);
    const [initialized, setInitialized] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedStream, setSelectedStream] = useState<any| undefined>(undefined)
    const [startTimestamp, setStartTimestamp] = useState<string| undefined>(parseAbsoluteToLocal(new Date().toISOString()).toString())

    const onSubmit = async  (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const payload = {
                instructor_id: 8,
                session_id: parseInt(selectedStream),
                start_timestamp: startTimestamp?.split('.')[0] + "Z"
            }
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('timesheet/instructor/report/create', 'POST', payload);
            if (dataResponse?.status === 201) {
                setIsLoading(false)
                onSuccess()
            } else {
                setIsLoading(false)
                showError(dataResponse?.response?.message)
            }
        } catch (error) {
            console.error(error);
        }
    };

    function showError(error: any) {

    }

    function handleTimeSelection(time: ZonedDateTime | null) {
        if (time) {
            const timeString = time.toAbsoluteString()
            console.log(timeString)
            setStartTimestamp(timeString)
        }
    }

    async function initializePage() {
        try {
            const payload = { instructor_id: 8 }
            const dataResponse = await NetworkingAPI.fetchDataFullResponse('livestream/instructor/list', 'POST', payload);
            const fetchedSessions = dataResponse?.response?.result
            if (fetchedSessions) {
                const parsed = fetchedSessions.map((session: any) => {
                    return { key: session?.key, label: session?.label }
                })
                setSessions(parsed)
                setInitialized(true)
            } else {
                setInitialized(false)
            }
        } catch (error) {
            console.error(error);
            setInitialized(false)
        }
    }

    useEffect(() => {
        initializePage()
    },[])

    return(
        <Modal isDismissable={!isLoading} isOpen={open} onOpenChange={(isOpen: boolean) => isOpen ? handleCancel() : {}} onClose={() => handleCancel()}>
            <ModalContent>
                <Form onSubmit={onSubmit}>
                    <ModalHeader title="New Timesheet Entry">New Timesheet Entry</ModalHeader>
                    <ModalBody className={'flex flex-col w-full'}>
                        <Select
                            onChange={(e) => setSelectedStream(e.target?.value)}
                            isDisabled={!initialized}
                            isRequired={true}
                            className="w-full"
                            items={sessions}
                            label="Trading Event"
                            placeholder="Select a live event"
                        >
                            {(animal) => <SelectItem>{animal.label}</SelectItem>}
                        </Select>

                        <DateInput isDisabled={!initialized} granularity={'minute'} isRequired={true}
                                   defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
                                   onChange={(event) => handleTimeSelection(event)}
                                   errorMessage={'Please enter a valid end date'}
                                   className="w-full" fullWidth={true} label="Session end time"
                                   placeholderValue={now(getLocalTimeZone())}/>

                        {errorMessage && (
                            <div className={'w-full flex flex-row justify-end mt-0'}>
                                <Alert
                                    hideIconWrapper
                                    color="danger"
                                    description={errorMessage}
                                    title={"Submission Error"}
                                    variant="flat"
                                />
                            </div>
                        )}
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
                        <Button isDisabled={!initialized} className={'mt-2 h-[50px] w-full'} isLoading={isLoading} type="submit" variant="solid"
                                    color={'warning'}>
                                Submit Entry
                            </Button>
                            <Button onPress={() => handleCancel()} className={'w-full'} isDisabled={isLoading} fullWidth={true} variant="flat"
                                    color={'default'}>
                                Cancel
                            </Button>
                        </div>
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