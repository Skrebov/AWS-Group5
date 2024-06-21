import TableSearchInput from '@/components/shared/table-search-input';
import ProductForm from "@/pages/products/forms/product-form.tsx";
import {Modal} from "@/components/ui/modal.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Product} from "../../../amplify/utils/model.ts";


type Props = {
    products: Product[];
    updateProducts: (products: Product[]) => void;
};

export const ProductTableActions: React.FC<Props> = ({products, updateProducts}) => {
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
                        closeModal={() => setOpenCreate(false)}
                        onSubmitNotify={(data) => {
                            const updatedProducts = [...products, data];
                            updateProducts(updatedProducts);
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