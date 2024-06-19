import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import {useEffect, useState} from "react";
import {Customer} from "../../../amplify/utils/model.ts";
import {getCustomers} from "../../../amplify/utils/queryUtils.ts";
import CustomerTableActions from "@/pages/customers/customer-table-action.tsx";
import {useSearchParams} from "react-router-dom";



export default function ConsumerTable() {
    //TODO make pagination, use customers & pageCount somehow ?
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;

    const [customerItems, setCustomerItems] = useState<Customer[]>([]);
    useEffect(() => {
        async function fetchCustomers() {
            setCustomerItems(await getCustomers('', pageLimit, searchQuery ? searchQuery : ''))
        }
        fetchCustomers();
    }, [])

    return (
        <>
            <CustomerTableActions />
            {customerItems && (
                <DataTable columns={columns} data={customerItems} pageCount={0} />
            )}
        </>
    );
}