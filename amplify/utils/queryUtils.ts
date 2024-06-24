import {generateClient} from "aws-amplify/api";
import {Schema} from "../data/resource";
import {Customer, CustomerPaginationType, Product, ProductPaginationType, InvoicePaginationType} from "./model";
import {
    mapCustomers,
    mapDataItems,
    mapProducts,
    mapRecentPurchases,
    mapToCustomer,
    mapToProduct,
} from "./mapper";

const client = generateClient<Schema>();

async function getByPKandSK (pk: string, sk: string ) {
    return await client.queries.getByPKandSK({pk : pk, sk: sk})
}

export async function getCustomer (customer: string): Promise<Customer> {
    const queryResult = await getByPKandSK(customer, customer);
    return mapToCustomer(queryResult?.data);
}

export async function getProduct (product: string): Promise<Product> {
    const queryResult = await getByPKandSK(product, product);
    return mapToProduct(queryResult?.data);
}

export async function getByType(type: string, nextToken:string, limit:number, searchQuery:string){
    return await client.queries.getByType({type,nextToken, limit, searchQuery});
}

export async function getCustomers(nextToken:string, limit:number, searchQuery:string): Promise<CustomerPaginationType> {
    const queryResult = await getByType('customer', nextToken, limit, searchQuery);
    const customers:Customer[] = mapCustomers(queryResult?.data?.items);
    return {customers, nextToken: queryResult?.data?.nextToken ? queryResult?.data?.nextToken : '' };
}

export async function getProducts(nextToken:string, limit:number, searchQuery:string): Promise<ProductPaginationType> {
    const queryResult = await getByType('product', nextToken, limit, searchQuery);
    const products:Product[] = mapProducts(queryResult?.data?.items);
    return {products, nextToken: queryResult?.data?.nextToken ? queryResult?.data?.nextToken : '' };
}

export async function addCustomer(
    pk: string,
    sk: string,
    birthdate?: string,
    email?: string,
    gender?: string,
    name?: string,
    phone?: string,
): Promise<Customer> {
    const response = await client.mutations.addCustomer({
        pk: pk,
        sk: sk,
        type: 'customer',
        birthdate: birthdate,
        email: email,
        gender: gender,
        name: name,
        phone: phone,
    });
    return mapToCustomer(response?.data);
}

export async function addProduct(
    pk: string,
    sk: string,
    category?: string,
    name?: string,
    price?: string,
    quantity?: number,
): Promise<Product> {
    const response = await client.mutations.addProduct({
        pk: pk,
        sk: sk,
        type: 'product',
        category: category,
        name: name,
        price: price,
        quantity: quantity,
    });
    return mapToProduct(response?.data);
}

export async function deleteByPKandSK(pk: string, sk: string) {
    return await client.mutations.deleteByPKandSK({ pk: pk, sk: sk })
}

export async function updateCustomer(
    pk: string,
    sk: string,
    birthdate?: string,
    email?: string,
    gender?: string,
    name?: string,
    phone?: string,
): Promise<Customer> {
    const response = await client.mutations.updateCustomer({
        pk: pk,
        sk: sk,
        type: 'customer',
        birthdate: birthdate,
        email: email,
        gender: gender,
        name: name,
        phone: phone,
    });
    return mapToCustomer(response?.data);
}

export async function updateProduct(
    pk: string,
    sk: string,
    category?: string,
    name?: string,
    price?: string,
    quantity?: number,
) {
    const response = await client.mutations.updateProduct({
        pk: pk,
        sk: sk,
        type: 'product',
        category: category,
        name: name,
        price: price,
        quantity: quantity,
    });
    return mapToProduct(response?.data);
}


export async function getAggregateInformation(){
    const year = new Date().getFullYear();
    const queryResult =  await client.queries.getAggregateInformation({year: year.toString()});
    return mapDataItems(queryResult?.data?.items);
}

export async function getRecentPurchases(limit:number, searchQuery:string, nextToken?:string) : Promise<InvoicePaginationType>{
    const queryResult =  await client.queries.getRecentPurchases({limit:limit, nextToken:nextToken, searchQuery:searchQuery});
    const invoices = mapRecentPurchases(queryResult?.data?.items)
    return {invoices, nextToken: queryResult?.data?.nextToken ? queryResult?.data?.nextToken : '' };
}
