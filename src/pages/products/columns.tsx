import {ColumnDef} from '@tanstack/react-table';
import {CellAction} from './cell-action';
import {Product} from "../../../amplify/utils/model.ts";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: () => <div>Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        id: 'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    }
];