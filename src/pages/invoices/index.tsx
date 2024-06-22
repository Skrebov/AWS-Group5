import DataTable from '@/components/shared/data-table';
import {columns} from './columns';
import InvoiceTableActions from './invoice-table-action.tsx';
import {useSearchParams} from "react-router-dom";
import {useGetInvoiceByType} from "@/pages/hooks/getByTypeHook.ts";
import {useState} from "react";


export default function InvoicesTable() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const searchQuery = searchParams.get('search') || null;
    const [paginationKeys, setPaginationKeys] = useState([''])
    const updatePaginationKeys = (keys:string[]) =>{
        setPaginationKeys(keys)
    }

    const data = useGetInvoiceByType(paginationKeys, page, updatePaginationKeys, pageLimit, searchQuery ? searchQuery : '')
    const invoices = data.data?.invoices ? data.data.invoices : [];


    return (
        <>
            <main className="relative flex-1 overflow-y-auto bg-background focus:outline-none px-4">
                <InvoiceTableActions />
                {data && (
                    <DataTable columns={columns} data={invoices} paginationKeys={paginationKeys} setPaginationKeys={setPaginationKeys} />
                )}
            </main>
        </>
    );
}