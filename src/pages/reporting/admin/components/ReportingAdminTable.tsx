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
import AdminReportingUserCell from "@/pages/reporting/admin/components/components/AdminReportingUserCell";
import {Alert} from "@heroui/alert";
import AdminReportingStreamsBox from "@/pages/reporting/admin/components/components/AdminReportingStreamsBox";

export const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "NAME", uid: "name", sortable: false},
    // {name: "AGE", uid: "age", sortable: true},
    // {name: "ROLE", uid: "role", sortable: true},
    // {name: "TEAM", uid: "team"},
    // {name: "EMAIL", uid: "email"},
    // {name: "STATUS", uid: "status", sortable: true},
    // {name: "ACTIONS", uid: "actions"},
];

export const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];

export const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "brian.kim@example.com",
        status: "Active",
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
        email: "michael.hunt@example.com",
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
        email: "samantha.brooks@example.com",
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "vacation",
        age: "33",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "frank.harrison@example.com",
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "emma.adams@example.com",
    },
    {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "brandon.stevens@example.com",
    },
    {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "paused",
        age: "28",
        avatar: "https://i.pravatar.cc/150?img=10",
        email: "megan.richards@example.com",
    },
    {
        id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "active",
        age: "37",
        avatar: "https://i.pravatar.cc/150?img=12",
        email: "oliver.scott@example.com",
    },
    {
        id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "active",
        age: "30",
        avatar: "https://i.pravatar.cc/150?img=16",
        email: "grace.allen@example.com",
    },
    {
        id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "paused",
        age: "31",
        avatar: "https://i.pravatar.cc/150?img=15",
        email: "noah.carter@example.com",
    },
    {
        id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?img=20",
        email: "ava.perez@example.com",
    },
    {
        id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "active",
        age: "28",
        avatar: "https://i.pravatar.cc/150?img=33",
        email: "liam.johnson@example.com",
    },
    {
        id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "active",
        age: "27",
        avatar: "https://i.pravatar.cc/150?img=29",
        email: "sophia.taylor@example.com",
    },
    {
        id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "paused",
        age: "32",
        avatar: "https://i.pravatar.cc/150?img=50",
        email: "lucas.harris@example.com",
    },
    {
        id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "active",
        age: "26",
        avatar: "https://i.pravatar.cc/150?img=45",
        email: "mia.robinson@example.com",
    },
];

export function capitalize(s: any) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

interface Props {
    data: any;
    isLoading: boolean;
}

export default function ReportingAdminTable({ isLoading }: Props) {

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
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

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

    useEffect(() => {

    }, [count]);

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
                        <Dropdown size={'md'}>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button size={'md'} endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button size={'md'} color="warning" endContent={<PlusIcon width={undefined} height={undefined}/>}>
                            Add New
                        </Button>
                    </div>
                </div>
                {/*<div className="flex justify-between items-center">*/}
                {/*    <span className="text-default-400 text-small">Total {users.length} users</span>*/}
                {/*    <label className="flex items-center text-default-400 text-small">*/}
                {/*        Rows per page:*/}
                {/*        <select*/}
                {/*            className="bg-transparent outline-none text-default-400 text-small"*/}
                {/*            onChange={onRowsPerPageChange}*/}
                {/*        >*/}
                {/*            <option value="5">5</option>*/}
                {/*            <option value="10">10</option>*/}
                {/*            <option value="15">15</option>*/}
                {/*        </select>*/}
                {/*    </label>*/}
                {/*</div>*/}
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users.length,
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
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
            <TableBody isLoading={isLoading} loadingContent={<Spinner color={'warning'} size={'lg'} variant={'gradient'} className={'text-white dark'} label={'Loading...'} />} emptyContent={"No users found"} items={sortedItems}>
                {(item: any) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Accordion onExpandedChange={(e) => handleRowSelection(item?.id, e)}  className={'dark w-full'}>
                                <AccordionItem
                                    className={'text-white'}
                                    key="1"
                                    aria-label="Accordion 1"
                                    subtitle=""
                                    title={
                                        <div className={'w-full flex flex-col justify-start mb-90'}>
                                            {expandedRows.includes(item.id) && (

                                                <div className={'w-full flex flex-row justify-between'}>
                                                    <p className={'text-[13px] text-white min-w-[280px] w-[280px]'}>Educator
                                                        /
                                                        Mentor</p>
                                                    <p className={'text-[13px] text-white w-full flex-shrink'}>Date</p>
                                                    <p className={'text-[13px] text-white w-full flex-shrink'}>Time-in-out</p>
                                                    <p className={'text-[13px] text-white w-full flex-shrink'}>Livestreams</p>
                                                    <p className={'text-[13px] text-white min-w-[100px] w-[100px]'}>Status</p>
                                                    <div className={'min-w-[80px] w-[80px]'}/>
                                                </div>
                                            )}
                                            {expandedRows.includes(item.id) && (
                                                <Divider className={'mb-3 mt-2 dark'}/>
                                            )}

                                            <div className={'w-full flex flex-row justify-between'}>
                                                <div className={'min-w-[280px] w-[280px] flex '}>
                                                    <User
                                                        className={'text-white'}
                                                        avatarProps={{radius: "lg", src: item?.avatar}}
                                                        description={
                                                            <p className={'text-[#FF9900]'}>{item?.email}</p>
                                                        }
                                                        name={item?.name}
                                                    >
                                                        {item?.email}
                                                    </User>
                                                </div>
                                                <div className={'w-full flex flex-shrink-1'}>
                                                    <div className="flex flex-col">
                                                        <p className="text-bold text-small capitalize text-white">{item?.id}</p>
                                                        <p className="text-bold text-tiny capitalize text-default-400">{item?.team}</p>
                                                    </div>
                                                </div>
                                                <div className={'w-full flex flex-shrink-1'}>
                                                    <p className="text-bold text-small capitalize text-white">8:30 AM -
                                                        5:34 PM</p>
                                                </div>
                                                <div className={'w-full flex flex-shrink-1'}>
                                                    {/*<Chip className="capitalize" color={'success'} size="sm"*/}
                                                    {/*      variant="flat">*/}
                                                    {/*    Status*/}
                                                    {/*</Chip>*/}
                                                </div>
                                                <div className={'min-w-[100px] w-[100px] flex '}>
                                                    <Chip className="capitalize" color={'success'} size="sm"
                                                          variant="flat">
                                                        Status
                                                    </Chip>
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
                                                <p className={'text-[13px] text-white min-w-[280px] w-[280px]'}>Live
                                                    Event Title</p>
                                                <p className={'text-[13px] text-white w-full flex-shrink'}>Clock In
                                                    Time</p>
                                                <p className={'text-[13px] text-white w-full flex-shrink'}>Clock Out
                                                    Time</p>
                                                <p className={'text-[13px] text-white w-full flex-shrink'}>Duration</p>
                                                <p className={'text-[13px] text-white min-w-[100px] w-[100px]'}>Status</p>
                                                <p className={'text-[13px] text-white min-w-[150px] w-[150px]'}></p>
                                                <div className={'min-w-[80px] w-[80px]'}/>
                                            </div>
                                            <AdminReportingStreamsBox/>
                                        </div>
                                        <div className={'w-full flex flex-row justify-end mt-3'}>
                                            <Alert
                                                hideIconWrapper
                                                color="danger"
                                                description="This mentor hans't reached their required threshold for the month yet"
                                                title="Threshold Alert"
                                                variant="solid"
                                            />
                                        </div>
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