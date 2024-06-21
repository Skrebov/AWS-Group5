import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import {CustomerTableActions} from "@/pages/customers/customer-table-action.tsx";
import {useSearchParams} from "react-router-dom";
import {useGetCustomersByType} from "@/pages/hooks/getByTypeHook.ts";
import {useState} from "react";
import {Customer} from "../../../amplify/utils/model.ts";



export default function ConsumerTable() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;
    const [paginationKeys, setPaginationKeys] = useState([''])
    const updatePaginationKeys = (keys:string[]) =>{
        setPaginationKeys(keys)
    }
    const updateCustomers = (customers:Customer[]) => {
        setCustomers(customers)
    }

    const [customers, setCustomers] = useState<Customer[]>([])

    const data = useGetCustomersByType(paginationKeys, page, updatePaginationKeys, pageLimit, searchQuery ? searchQuery : '', updateCustomers)


    return (
        <>
            <CustomerTableActions customers={customers} updateCustomers={updateCustomers}/>
            {data && (
                <DataTable columns={columns} data={customers} paginationKeys={paginationKeys} setPaginationKeys={setPaginationKeys} />
            )}
        </>
    );
}