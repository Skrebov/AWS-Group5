import TableSearchInput from '@/components/shared/table-search-input';

export default function InvoiceTableActions() {
    return (
        <div className="flex items-center justify-between py-5">
            <div className="flex flex-1 gap-4">
                <TableSearchInput placeholder="Search Invoices Here"/>
            </div>
        </div>
    );
}