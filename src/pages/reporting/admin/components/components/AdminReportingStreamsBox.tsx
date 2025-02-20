import {Avatar, Button, Listbox, ListboxItem, ScrollShadow} from "@heroui/react";
import {useMemo, useState} from "react";
import {Chip} from "@heroui/chip";
import NetworkingAPI from "@/helpers/NetworkingAPI";
import {parseAbsoluteToLocal} from "@internationalized/date";

export const ListboxWrapper = ({children}: any) => (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-2">
        {children}
    </div>
);

interface Props {
    sessions?: any[],
    handleApprove: (item: any) => void,
    handleDeny: (item: any) => void,
}

export default function AdminReportingStreamsBox({sessions = [], handleApprove, handleDeny}: Props) {

    const [values, setValues] = useState<any>(new Set(["1"]));

    function parseStatus(text_status: string) {
        if (text_status === "approved") {
            return { color: 'success' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Approved'}
        } else if (text_status === "denied") {
            return { color: 'danger' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Denied'}
        } else if (text_status === "needs_attention") {
            return { color: 'warning' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Changes Requested'}
        } else if (text_status === "submitted") {
            return { color: 'secondary' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Ready to Review'}
        } else if (text_status === "started") {
            return { color: 'secondary' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'In Progress'}
        } else if (text_status ?? "" === "") {
            return { color: 'warning' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'In Progress'}
        } else {
            return { color: 'default' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Unknown'}
        }
    }

    function getActionButton(text_status: string) {
        if (text_status === "approved") {
            return { text: 'View', disabled: true, hidden: false }
        } else if (text_status === "denied") {
            return { text: 'View Decision', disabled: false, hidden: false }
        } else if (text_status === "needs_attention") {
            return { text: 'Resubmit', disabled: false, hidden: false }
        } else if (text_status === "submitted") {
            return { text: 'Cancel Submission', disabled: false, hidden: false }
        } else if (text_status === "started") {
            return { text: 'Update Times', disabled: false, hidden: false }
        } else if ((text_status === "")) {
            return { text: 'Submit Times', disabled: false, hidden: false }
        } else {
            return { text: 'Update Times', disabled: false, hidden: false }
        }
    }

    return(
        <ListboxWrapper>
            <Listbox
                classNames={{
                    base: "w-full min-w-full",
                    list: "max-h-[200px] overflow-scroll",
                }}
                className={'w-full'}
                defaultSelectedKeys={["1"]}
                items={sessions}
                label="Assigned to"
                selectionMode="none"
                variant="flat"
                onSelectionChange={setValues}
            >
                {(item) => (
                    <ListboxItem key={item?.session?.id} textValue={item?.session?.title}>
                        <div className="flex justify-between gap-2 items-center">
                            <div className={"flex flex-col w-[280px] min-w-[280px]"}>
                                <span className="text-small">{item?.session?.title}</span>
                                <span className="text-tiny text-default-400">{parseAbsoluteToLocal(item?.timesheet?.clock_in ?? new Date().toISOString())?.toDate().toLocaleDateString()}</span>
                            </div>
                            <p className={'text-white w-full flex-shrink-1'}>{item?.timesheet?.clock_in ? parseAbsoluteToLocal(item?.timesheet?.clock_in ?? '')?.toDate()?.toLocaleTimeString() : <span className={'text-[#717171] italic'}>Not Entered</span> }</p>
                            <p className={'text-white w-full flex-shrink-1'}>{item?.timesheet?.clock_out ? parseAbsoluteToLocal(item?.timesheet?.clock_out ?? '')?.toDate()?.toLocaleTimeString() : <span className={'text-[#717171] italic'}>Not Entered</span>}</p>
                            <p className={'text-white w-full flex-shrink-1'}>{item?.timesheet?.duration ? item?.timesheet?.duration : "0"} hours</p>
                            <div className={'flex-shrink-1 min-w-[150px] w-[150px]'}>
                                <Chip className="capitalize"
                                      color={parseStatus(item?.timesheet?.status)?.color}
                                      size="sm"
                                      variant="flat">
                                    {parseStatus(item?.timesheet?.status)?.text}
                                </Chip>
                            </div>
                            <div className={'flex flex-row gap-3 w-[150px] max-w-[150px]'}>
                                <Button onPress={() => handleApprove(item)} isDisabled={item?.timesheet?.status === 'approved' || (!item?.timesheet?.clock_in || !item?.timesheet?.clock_out)} variant={'solid'} size={'sm'} color={'warning'}>Approve</Button>
                                <Button onPress={() => handleDeny(item)} isDisabled={item?.timesheet?.status === 'approved' || (!item?.timesheet?.clock_in || !item?.timesheet?.clock_out)} variant={'solid'} size={'sm'} color={'default'}>Deny</Button>
                            </div>
                            <div className={'min-w-[80px] w-[80px]'}/>
                        </div>
                    </ListboxItem>
                )}
            </Listbox>
        </ListboxWrapper>
    )
}
