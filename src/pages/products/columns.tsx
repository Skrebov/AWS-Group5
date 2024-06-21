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
        header: "Price",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        id: 'actions',
        cell: ({row, table}) => <CellAction data={row.original} completeData={table.options.data} setData={table.options.meta?.setData}/>
    }
];