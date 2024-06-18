import {AlertModal} from '@/components/shared/alert-modal';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Edit, MoreHorizontal, Trash} from 'lucide-react';
//import { useRouter } from '@/routes/hooks';
import {useState} from 'react';
import {Customer} from "../../../amplify/utils/model.ts";
import {Modal} from "@/components/ui/modal.tsx";
import CustomerForm from "@/pages/customers/forms/customer-from.tsx";

interface CellActionProps {
    data: Customer;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    //const router = useRouter();

    const onConfirm = async () => {
        //TODO delete data.pk
        console.log('delete ', data.pk)
        setOpenDelete(false)
    };

    return (
        <>
            <AlertModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <Modal
                isOpen={openUpdate}
                onClose={() => {
                    setOpenUpdate(false);
                }}
            >
                <CustomerForm
                    //TODO add states for updating table
                    closeModal={() => setOpenUpdate(false)}
                    initialValues={data}
                    onSubmitNotify={(updatedData) => {
                        console.log(updatedData);
                    }}
                    mode='edit'
                />
            </Modal>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        //                    onClick={() => router.push(`/dashboard/product/${data.pk}`)}
                        onClick={() => setOpenUpdate(true)}
                    >
                        <Edit className="mr-2 h-4 w-4"/> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                        <Trash className="mr-2 h-4 w-4"/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};