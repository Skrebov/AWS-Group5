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
        cell: ({row}) => <CellAction data={row.original}/>
    }
];