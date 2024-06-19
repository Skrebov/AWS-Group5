import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getCustomers, getProducts} from "../../../amplify/utils/queryUtils.ts";
import {CustomerPaginationType, ProductPaginationType} from "../../../amplify/utils/model.ts";

export const useGetProductByType = (paginationKeys:string[], page:number, setPaginationKeys: (keys:string[]) => void, pageLimit:number, searchQuery:string): UseQueryResult<ProductPaginationType> => {
    return useQuery({
        queryKey: ['products', paginationKeys[page-1], pageLimit, searchQuery],
        queryFn: async () => {
            const res = await getProducts(paginationKeys[page-1], pageLimit, searchQuery);
            if(res.nextToken !== undefined && res.nextToken !== '' && paginationKeys.length <= page){
                paginationKeys.push(res.nextToken)
                setPaginationKeys(paginationKeys)
            }
            return res;
        }
    });
};

export const useGetCustomersByType = (paginationKeys:string[], page:number, setPaginationKeys: (keys:string[]) => void, pageLimit:number, searchQuery:string): UseQueryResult<CustomerPaginationType> => {
    return useQuery({
        queryKey: ['customers', paginationKeys[page-1], pageLimit, searchQuery],
        queryFn: async () => {
            const res = await getCustomers(paginationKeys[page-1], pageLimit, searchQuery)
            if(res.nextToken !== undefined && res.nextToken !== '' && paginationKeys.length <= page){
                paginationKeys.push(res.nextToken)
                setPaginationKeys(paginationKeys)
            }
            return res;
        }
    });
};