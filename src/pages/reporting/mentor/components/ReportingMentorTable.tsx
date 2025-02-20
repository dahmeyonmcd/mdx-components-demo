"use client"

import {JSX, SVGProps, useCallback, useEffect, useMemo, useState} from "react";
import {Chip} from "@heroui/chip";
import {
    Accordion,
    AccordionItem,
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import {User} from "@heroui/user";
import {Alert} from "@heroui/alert";

export const columns = [
    {name: "ID", uid: "id", sortable: false},
    {name: "NAME", uid: "name", sortable: true},
];

export const statusOptions = [
    {name: "Approved", uid: "approved"},
    {name: "Denied", uid: "denied"},
    {name: "Needs Attention", uid: "need_attention"},
];

export function capitalize(s: any) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = ["name"];

interface Props {
    data: any[],
    isLoading: boolean,
    handleSelection: (value: any, action: string) => void,
    handleCreateNew: () => void,
}

export default function ReportingMentorTable({ isLoading, data, handleSelection, handleCreateNew }: Props) {

    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<any>("all");
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [count, setCount] = useState<number>(0);
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "name",
        direction: "descending",
    });
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column: any) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredTimesheets = [...data];

        if (hasSearchFilter) {
            filteredTimesheets = filteredTimesheets.filter((timesheet) =>
                timesheet?.session?.title?.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredTimesheets = filteredTimesheets.filter((timesheet) =>
                Array.from(statusFilter).includes(timesheet?.timesheet?.status),
            );
        }

        return filteredTimesheets;
    }, [data, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems?.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            // @ts-ignore
            const first = a[sortDescriptor?.column];
            // @ts-ignore
            const second = b[sortDescriptor?.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    function handleRowSelection(index: number, e: Set<any>) {
        if (e.has('1')) {
            const updatedRows = expandedRows
            updatedRows.push(index)
            setExpandedRows(updatedRows)
            setCount(count + 1)
        } else {
            if (expandedRows.includes(index)) {
                setExpandedRows(expandedRows.filter((row: number) => row !== index));
            }
            setCount(count + 1)
        }
    }

    function parseStatus(text_status: string) {
        if (text_status === "approved") {
            return { color: 'success' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Approved'}
        } else if (text_status === "denied") {
            return { color: 'danger' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Denied'}
        } else if (text_status === "needs_attention") {
            return { color: 'warning' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Needs Attention'}
        } else if (text_status === "submitted") {
            return { color: 'secondary' as "success" | "danger" | "warning" | "secondary" | "default" | "primary" | undefined, text: 'Under Review'}
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

    async function handleButtonAction(item: any) {
        const text_status = item?.timesheet?.status;

        if (text_status === "approved") {
            // TODO: ADD VIEW MODAL
            return handleSelection(item, 'view')
        } else if (text_status === "denied") {
            // TODO: ADD VIEW MODAL
            return handleSelection(item, 'view')
        } else if (text_status === "needs_attention") {
            // TODO: ADD EDIT MODAL
            return handleSelection(item, 'edit')
        } else if (text_status === "submitted") {
            // TODO: ADD ARE YOU SURE MODAL
            return handleSelection(item, 'cancel')
        } else if (text_status === "started") {
            // TODO: ADD EDIT MODAL
            return handleSelection(item, 'edit')
        } else if (text_status === "" || text_status === null) {
            // TODO: ADD EDIT MODAL
            return handleSelection(item, 'edit')
        } else {
            console.log('SDSS')
        }
    }

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e: any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value: any) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        size={'md'}
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon color={'#FF9900'} />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown size={'md'}>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button size={'md'} endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <Button onPress={() => handleCreateNew()} size={'md'} color="warning" endContent={<PlusIcon width={undefined} height={undefined}/>}>
                            New Entry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data?.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
                <Pagination
                    style={{fontFamily: 'Pixidot', fontWeight: 400}}
                    isCompact
                    showControls
                    showShadow
                    color="warning"
                    page={page}
                    total={pages}
                    size={'md'}
                    variant={'flat'}
                    radius={'sm'}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button style={{fontFamily: 'Pixidot', fontWeight: 400}} isDisabled={pages === 1} size="md" variant="flat" radius={'sm'} onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button style={{fontFamily: 'Pixidot', fontWeight: 400}} isDisabled={pages === 1} size="md" variant="flat" radius={'sm'} onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items?.length, page, pages, hasSearchFilter]);


    return (
        <Table
            isStriped={true}
            isHeaderSticky
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[calc(100vh-210px)]",
            }}
            rowHeight={150}
            className={'mt-6 dark h-full flex-shrink-1'}
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="inside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody isLoading={isLoading} loadingContent={<Spinner color={'warning'} size={'lg'} variant={'gradient'} className={'text-white dark'} label={'Loading...'} />} emptyContent={"No timesheets found"} items={sortedItems}>
                {(item: any) => (
                    <TableRow key={item?.timesheet?.id}>
                        <TableCell>
                            <Accordion onExpandedChange={(e) => handleRowSelection(item?.timesheet?.id, e)}  className={'dark w-full'}>
                                <AccordionItem
                                    className={'text-white'}
                                    key="1"
                                    aria-label="Accordion 1"
                                    subtitle=""
                                    title={
                                        <div className={'w-full flex flex-col justify-start mb-90'}>
                                            {expandedRows.includes(item?.timesheet?.id) && (

                                                <div className={'w-full flex flex-row justify-between'}>
                                                    <p className={'text-[13px] text-white min-w-[300px] w-[300px]'}>Educator
                                                        /
                                                        Mentor</p>
                                                    <p className={'text-[13px] text-white w-full flex-shrink'}>Date</p>
                                                    <p className={'text-[13px] text-white w-full flex-shrink'}>Time-in-out</p>
                                                    <p className={'text-[13px] text-white w-full flex-shrink'}>Livestreams</p>
                                                    <p className={'text-[13px] text-white min-w-[100px] w-[100px]'}>Status</p>
                                                    <div className={'min-w-[80px] w-[80px]'}/>
                                                </div>
                                            )}
                                            {expandedRows.includes(item?.timesheet?.id) && (
                                                <Divider className={'mb-3 mt-2 dark'}/>
                                            )}

                                            <div className={'w-full flex flex-row justify-between'}>
                                                <div className={'min-w-[300px] w-[300px] flex '}>
                                                    <User
                                                        className={'text-white'}
                                                        avatarProps={{radius: "lg",}}
                                                        description={
                                                            <p className={'text-[#FF9900]'}>{item?.mentor?.subtitle ?? 'Instructor'}</p>
                                                        }
                                                        name={item?.session?.title}
                                                    >
                                                        {item?.session?.email}
                                                    </User>
                                                </div>
                                                <div className={'w-full flex flex-shrink-1'}>
                                                    <div className="flex flex-col">
                                                        <p className="text-bold text-small text-white">{item?.payment_data?.duration ?? "0"} hrs</p>
                                                        <p className="text-bold text-tiny capitalize text-default-400">Accumulated Hours</p>
                                                    </div>
                                                </div>
                                                <div className={'w-full flex flex-shrink-1'}>
                                                    <div className="flex flex-col">
                                                        <p className="text-bold text-small capitalize text-white">{new Date(item?.timesheet?.clock_in).toLocaleTimeString()} - {item?.timesheet?.clock_out ? new Date(item?.timesheet?.clock_out).toLocaleTimeString() : "Not Yet Entered"}</p>
                                                        <p className="text-bold text-tiny capitalize text-default-400">Reporting
                                                            Timeframe</p>
                                                    </div>
                                                </div>
                                                <div className={'w-full flex flex-shrink-1'}>
                                                    <div className="flex flex-col">
                                                        <p className="text-bold text-small capitalize text-white">{item?.timesheet?.amount ?? (<span className={'text-[#8C8C8C]'}>Unpaid</span>)}</p>
                                                        <p className="text-bold text-tiny capitalize text-default-400">Payout Amount</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={'min-w-[150px] max-w-[150px] w-[150px] flex-col items-start flex-grow-0 justify-start flex h-[40px] '}>
                                                    <div className="flex flex-col">
                                                        <Chip className="capitalize"
                                                              color={parseStatus(item?.timesheet?.status)?.color}
                                                              size="sm"
                                                              variant="flat">
                                                            {parseStatus(item?.timesheet?.status)?.text}
                                                        </Chip>
                                                    </div>
                                                </div>
                                                <div className={'flex flex-row gap-3 min-w-[130px] w-[130px] max-w-[130px] justify-end items-center'}>
                                                    <Button fullWidth={true} onPress={() => handleButtonAction(item)} isDisabled={getActionButton(item?.timesheet?.status)?.disabled} variant={'solid'} size={'sm'}
                                                            color={'warning'}>{getActionButton(item?.timesheet?.status)?.text}</Button>
                                                    {/*<Button variant={'solid'} size={'sm'}*/}
                                                    {/*        color={'default'}>Deny</Button>*/}
                                                </div>
                                                <div className={'min-w-[80px] w-[80px]'}/>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className={'w-full flex flex-col justify-between'}>
                                        <Divider className={'dark mb-3'}/>
                                        <div className={'w-full flex flex-col justify-start'}>
                                            <div className={'w-full flex flex-row justify-between pl-4 pr-6'}>
                                                <p className={'text-[13px] text-white w-full'}>Reporting Responses</p>

                                            </div>
                                        </div>
                                        {item?.messages?.length > 0 ? (
                                            <div className={'w-full flex flex-row justify-end mt-3'}>
                                                <Alert
                                                    hideIconWrapper
                                                    color="danger"
                                                    description={item?.messages[0]?.message}
                                                    title={item?.messages[0]?.title}
                                                    variant="solid"
                                                />
                                            </div>
                                        ) : (
                                            <div className={'w-full flex flex-row justify-end mt-3'}>
                                                <Alert
                                                    hideIcon={true}
                                                    hideIconWrapper
                                                    color="default"
                                                    description={'This entry looks good. No issues found.'}
                                                    title={"No Issues"}
                                                    variant="solid"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </AccordionItem>
                            </Accordion>
                        </TableCell>
                    </TableRow>
                    // <TableRow key={item.id}>
                    //     {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    // </TableRow>
                )}
            </TableBody>
        </Table>
    );

}

const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const PlusIcon = ({size = 24, width, height, ...props}: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12"/>
                <path d="M12 18V6"/>
            </g>
        </svg>
    );
};

export const VerticalDotsIcon = ({size = 24, width, height, ...props}: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SearchIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};