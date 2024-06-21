import {ColumnDef} from '@tanstack/react-table';
import {CellAction} from './cell-action';
import {Customer} from "../../../amplify/utils/model.ts";

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "birthdate",
        header: "Birthdate",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        id: 'actions',
        cell: ({row, table}) => <CellAction data={row.original} completeData={table.options.data} setData={table.options.meta?.setData}/>
    }
];