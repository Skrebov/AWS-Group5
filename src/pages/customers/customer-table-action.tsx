import TableSearchInput from '@/components/shared/table-search-input';
import CustomerForm from "@/pages/customers/forms/customer-from.tsx";
import {Modal} from "@/components/ui/modal.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useState} from "react";
import {Customer} from "../../../amplify/utils/model.ts";

type Props = {
    customers: Customer[];
    updateCustomers: (customers: Customer[]) => void;
};

export const CustomerTableActions: React.FC<Props> = ({customers, updateCustomers}) => {
    const [openCreate, setOpenCreate] = useState(false);
    return (
        <div className="flex items-center justify-between py-5">
            <div className="flex flex-1 gap-4">
                <TableSearchInput placeholder="Search Customers Here"/>
            </div>
            <div className="flex gap-3">
                <Modal
                    isOpen={openCreate}
                    onClose={() => {
                        setOpenCreate(false);
                    }}
                >
                    <CustomerForm
                        //TODO add states for updating table
                        closeModal={() => setOpenCreate(false)}
                        onSubmitNotify={(data) => {
                            const updatedCustomers = [...customers, data];
                            updateCustomers(updatedCustomers);
                        }}
                        mode='create'
                    />
                </Modal>
                <div className='flex justify-center'>
                    <Button
                        onClick={() => {
                            setOpenCreate(true);
                        }}
                    >
                        <Plus/>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
}