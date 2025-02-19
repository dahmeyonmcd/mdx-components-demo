import React, {useState} from "react";
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
    Switch, cn, TimeInput, Divider
} from "@heroui/react";

interface Props {
    date?: Date,
    event?: any,
    open: boolean;
    onClose: () => void;
    handleCancel: () => void;
}

export default function CreateEventDialog({ open, onClose, handleCancel, date, event }: Props) {

    const [submitted, setSubmitted] = useState<any | null>(null);
    const [recurring, setRecurring] = useState<boolean>(event?.recurring ?? false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = (e: any) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);
    };

    return(
        <div>
            <div
                className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
                onClick={() => handleCancel()}
            >
                <Card className="py-4 px-4">
                    <Form className="w-[500px] max-w-sm" onSubmit={onSubmit}>
                        <Input
                            defaultValue={event?.title}
                            isRequired
                            errorMessage="Please enter a valid title"
                            label="Event title"
                            labelPlacement="inside"
                            name="title"
                            placeholder="E.g. Exclusive Trading Event"
                            type="text"
                        />
                        <Input
                            defaultValue={event?.event_id}
                            isRequired
                            errorMessage="Please enter a event Id"
                            label="Event ID"
                            labelPlacement="inside"
                            name="event"
                            placeholder="E.g. 000000"
                            type="number"
                        />
                        <DatePicker isRequired={true} errorMessage={'Please enter a valid start date'}
                                    className="w-full" label="Scheduled start date"/>
                        <TimeInput isRequired={true} errorMessage={'Please enter a valid start time'}
                                   className={'w-full'} label="Scheduled start time"/>
                        <TimeInput isRequired={false} errorMessage={'Please enter a valid end time'}
                                   className={'w-full'} label="Scheduled end time"/>
                        <Select
                            isRequired={true}
                            className="w-full"
                            items={animals}
                            label="Educator/Host"
                            placeholder="Select an educator"
                        >
                            {(animal) => <SelectItem>{animal.label}</SelectItem>}
                        </Select>

                        <Switch
                            isSelected={recurring} onValueChange={setRecurring}
                            classNames={{
                                base: cn(
                                    "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                    "data-[selected=true]:border-primary",
                                ),
                                wrapper: "p-0 h-4 overflow-visible",
                                thumb: cn(
                                    "w-6 h-6 border-2 shadow-lg",
                                    "group-data-[hover=true]:border-primary",
                                    //selected
                                    "group-data-[selected=true]:ms-6",
                                    // pressed
                                    "group-data-[pressed=true]:w-7",
                                    "group-data-[selected]:group-data-[pressed]:ms-4",
                                ),
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-medium">Recurring Event?</p>
                                <p className="text-tiny text-default-400">
                                    Get access to new features before they are released.
                                </p>
                            </div>
                        </Switch>

                        {recurring && (
                            <CheckboxGroup
                                errorMessage={'Please select a recurring event'}
                                isRequired={recurring}
                                color="secondary"
                                defaultValue={["buenos-aires", "san-francisco"]}
                                label=""
                                orientation="horizontal"
                                className={'w-full mt-2 text-white'}
                            >
                                <Checkbox value={"0"}>S</Checkbox>
                                <Checkbox value="1">M</Checkbox>
                                <Checkbox value="2">T</Checkbox>
                                <Checkbox value="3">W</Checkbox>
                                <Checkbox value="4">T</Checkbox>
                                <Checkbox value="5">F</Checkbox>
                                <Checkbox value="6">S</Checkbox>
                            </CheckboxGroup>
                        )}
                        <Divider className={'my-3'}/>
                        <p className="text-tiny text-default-400">
                            When creating a live streaming event it is important to obtain a <strong>Vimeo Event
                            ID</strong> to view in platform
                        </p>
                        <Button className={'mt-2 h-[50px] w-full'} isLoading={isLoading} type="submit" variant="solid"
                                color={'warning'}>
                            Save changes
                        </Button>
                        {submitted && (
                            <div className="text-small text-default-500">
                                You submitted: <code>{JSON.stringify(submitted)}</code>
                            </div>
                        )}
                    </Form>
                </Card>


                {/*<div*/}
                {/*    className="bg-white p-6 rounded"*/}
                {/*    onClick={(e) => {*/}
                {/*        e.stopPropagation();*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <h2 className="text-lg font-bold mb-2">{selectedEvent.title}</h2>*/}
                {/*    <p>{selectedEvent.description}</p>*/}
                {/*    <div className="flex justify-end space-x-2 mt-4">*/}
                {/*        <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"*/}
                {/*                onClick={() => setShowEventForm(true)}>*/}
                {/*            Edit*/}
                {/*        </button>*/}
                {/*        <button className="bg-red-500 text-white px-2 py-1 rounded flex items-center"*/}
                {/*                onClick={() => alert('Event Deleted!')}>*/}
                {/*            Delete*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
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