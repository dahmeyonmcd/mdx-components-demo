import {AccordionItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {User} from "@heroui/user";
import {Chip} from "@heroui/chip";
import {VerticalDotsIcon} from "@/pages/reporting/admin/components/ReportingAdminTable";

const statusColorMap = [
    {status: "success", color: "success"},
    {status: "paused", color: "danger"},
    {status: "vacation", color: "warning"}
]

export default function AdminReportingUserCell({data}: any) {

    console.log(data)
    return(
        <AccordionItem>

        </AccordionItem>
    )
    return(
        <AccordionItem
            className={'text-white'}
            key="1"
            aria-label="Accordion 1"
            subtitle="Press to expand"
            title={
                <>
                    <User
                        className={'text-white'}
                        avatarProps={{radius: "lg", src: data?.avatar}}
                        description={
                            <p className={'text-[#FF9900]'}>{data?.email}</p>
                        }
                        name={data?.name}
                    >
                        {data?.email}
                    </User>
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize text-white">{data?.id}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{data?.team}</p>
                    </div>
                    <Chip className="capitalize" color={'success'} size="sm" variant="flat">
                        Status
                    </Chip>
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" width={undefined}
                                                      height={undefined}/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="view">View</DropdownItem>
                                <DropdownItem key="edit">Edit</DropdownItem>
                                <DropdownItem key="delete">Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </>
            }
        >
            {defaultContent}
        </AccordionItem>
    )

}

const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
