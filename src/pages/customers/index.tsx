import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import CustomerTableActions from "@/pages/customers/customer-table-action.tsx";
import {useSearchParams} from "react-router-dom";
import {useGetCustomersByType} from "@/pages/hooks/getByTypeHook.ts";



export default function ConsumerTable() {
    //TODO make pagination, use customers & pageCount somehow ?
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;

    const data = useGetCustomersByType('', pageLimit, searchQuery ? searchQuery : '')
    const customers = data.data?.customers ? data.data.customers : [];

    return (
        <>
            <CustomerTableActions />
            {data && (
                <DataTable columns={columns} data={customers} pageCount={0} />
            )}
        </>
    );
}