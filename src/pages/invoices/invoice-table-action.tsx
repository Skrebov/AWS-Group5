import TableSearchInput from '@/components/shared/table-search-input';
import {Modal} from "@/components/ui/modal.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
//import StudentCreateForm from '../student-forms/student-create-form';

export default function InvoiceTableActions() {
    const [openCreate, setOpenCreate] = useState(false);
    return (
        <div className="flex items-center justify-between py-5">
            <div className="flex flex-1 gap-4">
                <TableSearchInput placeholder="Search Invoices Here"/>
            </div>
            <div className="flex gap-3">
                <Modal
                    isOpen={openCreate}
                    onClose={() => {
                        setOpenCreate(false);
                    }}
                >
                </Modal>
                <div className='flex justify-center'>
                    <Button className='min-w-20'
                        onClick={() => {
                            setOpenCreate(true);
                        }}
                    >
                        Create
                    </Button>
                </div>
                {/*<PopupModal*/}
                {/*    renderModal={(onClose) =>*/}
                {/*        <InvoiceForm*/}
                {/*            //TODO add states for updating table*/}
                {/*            closeModal={onClose}*/}
                {/*            onSubmitNotify={(data) => {*/}
                {/*                console.log(data);*/}
                {/*            }}*/}
                {/*            mode='create'*/}
                {/*        />*/}
                {/*}*/}
                {/*/>*/}
            </div>
        </div>
    );
}