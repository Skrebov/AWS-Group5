import {ColumnDef} from '@tanstack/react-table';
import {Invoice} from "../../../amplify/utils/model.ts";
import { Icons } from '@/components/ui/icons';

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "name",
        header: "Customer",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "date",
        header: "Date",
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <div className="flex justify-center items-center">
                <Icons.page className="w-5 h-5 text-blue-500" /> {/* Customize the class names as needed */}
            </div>
        ),
    },
];