import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import CustomerTableActions from "@/pages/customers/customer-table-action.tsx";
import {useSearchParams} from "react-router-dom";
import {useGetCustomersByType} from "@/pages/hooks/getByTypeHook.ts";
import {useState} from "react";



export default function ConsumerTable() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;
    const [paginationKeys, setPaginationKeys] = useState([''])
    const updatePaginationKeys = (keys:string[]) =>{
        setPaginationKeys(keys)
    }

    const data = useGetCustomersByType(paginationKeys, page, updatePaginationKeys, pageLimit, searchQuery ? searchQuery : '')
    const customers = data.data?.customers ? data.data.customers : [];

    return (
        <>
            <main className="relative flex-1 overflow-y-auto bg-background focus:outline-none px-4">
                <CustomerTableActions />
                {data && (
                    <DataTable columns={columns} data={customers} paginationKeys={paginationKeys} setPaginationKeys={setPaginationKeys} />
                )}
            </main>
        </>
    );
}