import {AlertModal} from '@/components/shared/alert-modal';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Edit, Gift, MoreHorizontal, Trash} from 'lucide-react';
//import { useRouter } from '@/routes/hooks';
import {useState} from 'react';
import {Customer, Product} from "../../../amplify/utils/model.ts";
import {Modal} from "@/components/ui/modal.tsx";
import CustomerForm from "@/pages/customers/forms/customer-from.tsx";
import {deleteByPKandSK} from "../../../amplify/utils/queryUtils.ts";
import ProductModal from "@/components/shared/product-modal.tsx";
import {getRecommendations} from "../../../amplify/utils/lambdas.ts";

interface CellActionProps {
    data: Customer;
    completeData: Customer[]
    setData: ((newCustomers: Customer[]) => void) | undefined;
}

export const CellAction: React.FC<CellActionProps> = ({ data, completeData, setData }) => {
    const [loading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openRecommendations, setOpenRecommendations] = useState(false);
    //const router = useRouter();

    const onConfirm = async () => {
        await deleteByPKandSK(data.pk, data.sk)
        console.log('delete ', data.pk)
        const customer: Customer | undefined = completeData.find(customer => customer.pk === data.pk && customer.sk === data.sk);
        if(customer) {
           const changedCustomers:Customer[] = completeData.filter(customer => customer.pk !== data.pk && customer.sk !== data.sk);
           if(setData){
               setData(changedCustomers);
           }
        }
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
                        const toUpdate:Customer|undefined = completeData.find(customer => customer.pk === updatedData.pk && customer.sk === updatedData.sk)
                        if(toUpdate) {
                            const updatedCustomers = completeData.map(customer => customer.pk === updatedData.pk && customer.sk === updatedData.sk ? updatedData : customer);
                            if(setData){
                                setData(updatedCustomers);
                            }
                        }
                    }}
                    mode='edit'
                />
            </Modal>
            <Modal
                isOpen={openRecommendations}
                onClose={() => {
                    setOpenRecommendations(false);
                }}
            >
                <ProductModal customerId={data.pk} closeModal={() => setOpenRecommendations(false)} getData={getRecommendations} mode={'recommendation'}/>
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
                    <DropdownMenuItem onClick={() => setOpenRecommendations(true)}>
                        <Gift className="mr-2 h-4 w-4"/> Recommendations
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};