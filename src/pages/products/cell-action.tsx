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
import {useState} from 'react';
import {Product} from "../../../amplify/utils/model.ts";
import ProductForm from "@/pages/products/forms/product-form.tsx";
import {Modal} from "@/components/ui/modal.tsx";
import {deleteByPKandSK} from "../../../amplify/utils/queryUtils.ts";

interface CellActionProps {
    data: Product;
    completeData: Product[]
    setData: ((newProducts: Product[]) => void) | undefined;
}

export const CellAction: React.FC<CellActionProps> = ({data, completeData, setData}) => {
    const [loading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const onConfirm = async () => {
        await deleteByPKandSK(data.pk, data.sk)
        console.log('delete ', data.pk)
        const product: Product | undefined = completeData.find(prod => prod.pk === data.pk && prod.sk === data.sk);
        if(product) {
            const changedProducts:Product[] = completeData.filter(customer => customer.pk !== data.pk && customer.sk !== data.sk);
            if (setData) {
                setData(changedProducts);
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
                <ProductForm
                    //TODO add states for updating table
                    closeModal={() => setOpenUpdate(false)}
                    initialValues={data}
                    onSubmitNotify={(updatedData) => {
                        const toUpdate:Product|undefined = completeData.find(product => product.pk === updatedData.pk && product.sk === updatedData.sk)
                        if(toUpdate) {
                            const updatedProducts = completeData.map(product => product.pk === updatedData.pk && product.sk === updatedData.sk ? updatedData : product);
                            if(setData){
                                setData(updatedProducts);
                            }
                        }
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