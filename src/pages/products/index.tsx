import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import ProductTableActions from './product-table-action.tsx';
import {useEffect, useState} from "react";
import {Product} from "../../../amplify/utils/model.ts";
import {getProducts} from "../../../amplify/utils/queryUtils.ts";

type TProductsTableProps = {
    products: any;
    page: number;
    totalProducts: number;
    pageCount: number;
};

export default function ProductsTable({
                                          //products,
                                          //pageCount
                                      }: TProductsTableProps) {
    //TODO make pagination, use products & pageCount somehow ?
    const [productItems, setProductItems] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchProducts() {
            setProductItems(await getProducts())
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