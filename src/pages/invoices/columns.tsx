import {ColumnDef} from '@tanstack/react-table';
import {RecentPurchase} from "../../../amplify/utils/model.ts";
import {CellAction} from "./cell-action.tsx";

export const columns: ColumnDef<RecentPurchase>[] = [
    {
        accessorKey: "pk",
        header: "pk",
    },
    {
        accessorKey: "customerName",
        header: "Customer",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "totalAmount",
        header: () => <div>Total</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalAmount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        id: 'actions',
        cell: ({row, table}) => <CellAction data={row.original} completeData={table.options.data} setData={table.options.meta?.setData}/>
    },
];