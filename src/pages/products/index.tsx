import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import ProductTableActions from './product-table-action.tsx';
import {useSearchParams} from "react-router-dom";
import {useGetProductByType} from "@/pages/hooks/getByTypeHook.ts";


export default function ProductsTable() {
    //TODO make pagination, use products & pageCount somehow ?
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;

    const data = useGetProductByType('', pageLimit, searchQuery ? searchQuery : '')
    const products = data.data?.products ? data.data.products : [];


    return (
        <>
            <ProductTableActions />
            {data && (
                <DataTable columns={columns} data={products} pageCount={0} />
            )}
        </>
    );
}