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

interface CellActionProps {
    data: RecentPurchase;
    completeData: RecentPurchase[]
    setData: ((newInvoices: RecentPurchase[]) => void) | undefined;
}

export const CellAction: React.FC<CellActionProps> = ({data, completeData, setData}) => {
    const [loading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    return (
        <>
            <Modal
                isOpen={openUpdate}
                onClose={() => {
                    setOpenUpdate(false);
                }}
            >

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
                        onClick={async () =>{
                            console.log(await getInvoiceProducts(data.pk))
                        }}
                    >
                        <Image className="mr-2 h-4 w-4"/> Products
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};