import {Avatar, Button, Listbox, ListboxItem, ScrollShadow} from "@heroui/react";
import {useMemo, useState} from "react";
import {Chip} from "@heroui/chip";

export const ListboxWrapper = ({children}: any) => (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-2">
        {children}
    </div>
);

interface Props {
    sessions?: any[]
}

export default function AdminReportingStreamsBox({sessions = []}: Props) {

    const [values, setValues] = useState<any>(new Set(["1"]));

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
                                <span className="text-tiny text-default-400">{new Date(item?.timesheet?.clock_in).toLocaleDateString()}</span>
                            </div>
                            <p className={'text-white w-full flex-shrink-1'}>{new Date(item?.timesheet?.clock_in).toLocaleTimeString()}</p>
                            <p className={'text-white w-full flex-shrink-1'}>{new Date(item?.timesheet?.clock_out).toLocaleTimeString()}</p>
                            <p className={'text-white w-full flex-shrink-1'}>{item?.timesheet?.duration} hours</p>
                            <div className={'flex-shrink-1 min-w-[100px] w-[100px]'}>
                                <Chip key={0} variant={'flat'} color={'success'} size={'sm'}>Done</Chip>
                            </div>
                            <div className={'flex flex-row gap-3 w-[150px] max-w-[150px]'}>
                                <Button variant={'solid'} size={'sm'} color={'warning'}>Approve</Button>
                                <Button variant={'solid'} size={'sm'} color={'default'}>Deny</Button>
                            </div>
                            <div className={'min-w-[80px] w-[80px]'}/>
                        </div>
                    </ListboxItem>
                )}
            </Listbox>
        </ListboxWrapper>
    )
}
