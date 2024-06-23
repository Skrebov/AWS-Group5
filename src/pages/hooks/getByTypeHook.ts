import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getCustomers, getInvoices, getProducts} from "../../../amplify/utils/queryUtils.ts";
import {
    Customer,
    InvoicePaginationType,
    CustomerPaginationType,
    Product,
    ProductPaginationType,
    RecentPurchase
} from "../../../amplify/utils/model.ts";

export const useGetProductByType = (paginationKeys:string[], page:number, setPaginationKeys: (keys:string[]) => void, pageLimit:number, searchQuery:string,  updateProducts: (keys:Product[]) => void): UseQueryResult<ProductPaginationType> => {
    return useQuery({
        queryKey: ['products', paginationKeys[page-1], pageLimit, searchQuery],
        queryFn: async () => {
            const res = await getProducts(paginationKeys[page-1], pageLimit, searchQuery);
            if(res.nextToken !== undefined && res.nextToken !== '' && paginationKeys.length <= page){
                paginationKeys.push(res.nextToken)
                setPaginationKeys(paginationKeys)
            }
            updateProducts(res.products)
            return res;
        }
    });
};

export const useGetCustomersByType = (paginationKeys:string[], page:number, setPaginationKeys: (keys:string[]) => void, pageLimit:number, searchQuery:string,  updateCustomers: (keys:Customer[]) => void): UseQueryResult<CustomerPaginationType> => {
    return useQuery({
        queryKey: ['customers', paginationKeys[page-1], pageLimit, searchQuery],
        queryFn: async () => {
            const res = await getCustomers(paginationKeys[page-1], pageLimit, searchQuery)
            if(res.nextToken !== undefined && res.nextToken !== '' && paginationKeys.length <= page){
                paginationKeys.push(res.nextToken)
                setPaginationKeys(paginationKeys)
            }
            updateCustomers(res.customers)
            return res;
        }
    });
};

export const useGetInvoiceByType = (paginationKeys:string[], page:number, setPaginationKeys: (keys:string[]) => void, pageLimit:number, searchQuery:string, updateInvoices: (keys:RecentPurchase[]) => void): UseQueryResult<InvoicePaginationType> => {
    return useQuery({
        queryKey: ['invoices', paginationKeys[page-1], pageLimit, searchQuery],
        queryFn: async () => {
            const res = await getInvoices(paginationKeys[page-1], pageLimit, searchQuery);
            if(res.nextToken !== undefined && res.nextToken !== '' && paginationKeys.length <= page){
                paginationKeys.push(res.nextToken)
                setPaginationKeys(paginationKeys)
            }
            updateInvoices(res.invoices);
            return res;
        }
    });
};