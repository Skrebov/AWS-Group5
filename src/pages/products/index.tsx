import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import ProductTableActions from './product-table-action.tsx';
import {useEffect, useState} from "react";
import {Product} from "../../../amplify/utils/model.ts";
import {getProducts} from "../../../amplify/utils/queryUtils.ts";
import {useSearchParams} from "react-router-dom";


export default function ProductsTable() {
    //TODO make pagination, use products & pageCount somehow ?
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;

    const [productItems, setProductItems] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchProducts() {
            setProductItems(await getProducts('', pageLimit, searchQuery ? searchQuery : ''))
        }
        fetchProducts();
    }, [])

    return (
        <>
            <ProductTableActions />
            {productItems && (
                <DataTable columns={columns} data={productItems} pageCount={0} />
            )}
        </>
    );
}