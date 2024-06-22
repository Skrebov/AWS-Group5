import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import {ProductTableActions} from './product-table-action.tsx';
import {useSearchParams} from "react-router-dom";
import {useGetProductByType} from "@/pages/hooks/getByTypeHook.ts";
import {useState} from "react";
import {Customer, Product} from "../../../amplify/utils/model.ts";


export default function ProductsTable() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;
    const [paginationKeys, setPaginationKeys] = useState([''])
    const updatePaginationKeys = (keys:string[]) =>{
        setPaginationKeys(keys)
    }
    const updateProducts = (products:Product[]) => {
        setProducts(products)
    }

    const [products, setProducts] = useState<Product[]>([])

    const data = useGetProductByType(paginationKeys, page, updatePaginationKeys, pageLimit, searchQuery ? searchQuery : '', updateProducts)

    return (
        <main className="relative flex-1 overflow-y-auto bg-background focus:outline-none px-4">
            <ProductTableActions products={products} updateProducts={updateProducts}/>
            {data && (
                <DataTable columns={columns} data={products} setData={setProducts} paginationKeys={paginationKeys} setPaginationKeys={setPaginationKeys} />
            )}
        </main>
    );
}