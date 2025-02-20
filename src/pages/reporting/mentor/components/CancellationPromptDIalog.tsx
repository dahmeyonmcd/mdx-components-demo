import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/react";

interface Props {
    open: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    timesheet?: any
}
export default function CancellationPromptDialog ({ open, onCancel, onSuccess, timesheet}: Props) {

    return(
        <Modal isOpen={open} onOpenChange={(isOpen: boolean) => isOpen ? onCancel() : {}} onClose={() => onCancel()}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">Timesheet Cancellation</ModalHeader>
                    <ModalBody>
                        <p>
                            Are you sure you want to cancel the submitted timesheet?
                            Please note that all previously submitted times will be removed, and you will be able to edit and re-submit them.
                        </p>
                        <p>
                            Click Confirm to proceed with the cancellation or Cancel to return to the timesheet.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="solid" onPress={() => onCancel()}>
                            Cancel
                        </Button>
                        <Button color="warning" onPress={() => onCancel()}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}