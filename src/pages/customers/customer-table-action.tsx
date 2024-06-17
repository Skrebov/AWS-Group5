import TableSearchInput from '@/components/shared/table-search-input';
import CustomerForm from "@/pages/customers/forms/customer-from.tsx";
import {Modal} from "@/components/ui/modal.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useState} from "react";
//import StudentCreateForm from '../student-forms/student-create-form';

export default function CustomerTableActions() {
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
                            console.log(data);
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