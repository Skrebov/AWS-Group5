import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Image, MoreHorizontal} from 'lucide-react';
import {useState} from 'react';
import {RecentPurchase} from "../../../amplify/utils/model.ts";
import {Modal} from "@/components/ui/modal.tsx";
import {getInvoiceProducts} from "../../../amplify/utils/lambdas.ts";
import ProductModal from "@/components/shared/product-modal.tsx";

interface CellActionProps {
    data: RecentPurchase;
    completeData: RecentPurchase[]
    setData: ((newInvoices: RecentPurchase[]) => void) | undefined;
}

export const CellAction: React.FC<CellActionProps> = ({data, completeData, setData}) => {
    const [openProducts, setOpenProducts] = useState(false);

    return (
        <>
            <Modal
                isOpen={openProducts}
                onClose={() => {
                    setOpenProducts(false);
                }}
            >
                <ProductModal customerId={data.pk} closeModal={() => setOpenProducts(false)}
                              getData={getInvoiceProducts} mode={'invoice'}/>
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
                        onClick={async () => {
                            setOpenProducts(true)
                        }}
                    >
                        <Image className="mr-2 h-4 w-4"/> Products
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};