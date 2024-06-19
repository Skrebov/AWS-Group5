import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import ProductTableActions from './product-table-action.tsx';
import {useSearchParams} from "react-router-dom";
import {useGetProductByType} from "@/pages/hooks/getByTypeHook.ts";
import {useState} from "react";


export default function ProductsTable() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;
    const [paginationKeys, setPaginationKeys] = useState([''])
    const updatePaginationKeys = (keys:string[]) =>{
        setPaginationKeys(keys)
    }

    const data = useGetProductByType(paginationKeys, page, updatePaginationKeys, pageLimit, searchQuery ? searchQuery : '')
    const products = data.data?.products ? data.data.products : [];


    return (
        <>
            <ProductTableActions />
            {data && (
                <DataTable columns={columns} data={products} paginationKeys={paginationKeys} setPaginationKeys={setPaginationKeys} />
            )}
        </>
    );
}