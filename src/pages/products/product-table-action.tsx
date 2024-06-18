import TableSearchInput from '@/components/shared/table-search-input';
import ProductForm from "@/pages/products/forms/product-form.tsx";
import {Modal} from "@/components/ui/modal.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
//import StudentCreateForm from '../student-forms/student-create-form';

export default function ProductTableActions() {
    const [openCreate, setOpenCreate] = useState(false);
    return (
        <div className="flex items-center justify-between py-5">
            <div className="flex flex-1 gap-4">
                <TableSearchInput placeholder="Search Products Here"/>
            </div>
            <div className="flex gap-3">
                <Modal
                    isOpen={openCreate}
                    onClose={() => {
                        setOpenCreate(false);
                    }}
                >
                    <ProductForm
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
                {/*<PopupModal*/}
                {/*    renderModal={(onClose) =>*/}
                {/*        <ProductForm*/}
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