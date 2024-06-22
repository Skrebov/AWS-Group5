import TableSearchInput from '@/components/shared/table-search-input';
import ProductForm from "@/pages/products/forms/product-form.tsx";
import {Modal} from "@/components/ui/modal.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Product} from "../../../amplify/utils/model.ts";
import {useSearchParams} from "react-router-dom";


type Props = {
    products: Product[];
    updateProducts: (products: Product[]) => void;
};

export const ProductTableActions: React.FC<Props> = ({products, updateProducts}) => {
    const [searchParams] = useSearchParams();
    const pageLimit = Number(searchParams.get('limit') || 10);
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
                           if(products.length < pageLimit){
                               const updatedProducts = [...products, data];
                               updateProducts(updatedProducts);
                           }
                        }}
                        mode='create'
                    />
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
            </div>
        </div>
    );
}