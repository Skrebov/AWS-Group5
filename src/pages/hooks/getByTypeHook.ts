import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getCustomers, getProducts} from "../../../amplify/utils/queryUtils.ts";
import {CustomerPaginationType, ProductPaginationType} from "../../../amplify/utils/model.ts";

export const useGetProductByType = (exclusiveStartKey:string, pageLimit:number, searchQuery:string): UseQueryResult<ProductPaginationType> => {
    return useQuery({
        queryKey: ['products', exclusiveStartKey, pageLimit, searchQuery],
        queryFn: async () => await getProducts(exclusiveStartKey, pageLimit, searchQuery)
    });
};

export const useGetCustomersByType = (exclusiveStartKey:string, pageLimit:number, searchQuery:string): UseQueryResult<CustomerPaginationType> => {
    return useQuery({
        queryKey: ['customers', exclusiveStartKey, pageLimit, searchQuery],
        queryFn: async () => await getCustomers(exclusiveStartKey, pageLimit, searchQuery)
    });
};