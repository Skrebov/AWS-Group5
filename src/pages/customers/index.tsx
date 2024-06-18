import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import {useEffect, useState} from "react";
import {Customer} from "../../../amplify/utils/model.ts";
import {getCustomers} from "../../../amplify/utils/queryUtils.ts";
import CustomerTableActions from "@/pages/customers/customer-table-action.tsx";

type TCustomersTableProps = {
    customers: any;
    page: number;
    totalCustomers: number;
    pageCount: number;
};

export default function ConsumerTable({
                                          //customers,
                                          //pageCount
                                      }: TCustomersTableProps) {
    //TODO make pagination, use customers & pageCount somehow ?
    const [customerItems, setCustomerItems] = useState<Customer[]>([]);
    useEffect(() => {
        async function fetchCustomers() {
            setCustomerItems(await getCustomers())
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