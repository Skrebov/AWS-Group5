import {generateClient} from "aws-amplify/api";
import {Schema} from "../data/resource";
import {
    Customer,
    CustomerPaginationType,
    Invoice,
    InvoicePaginationType,
    Product,
    ProductPaginationType
} from "./model";
import {
    mapCustomers,
    mapDataItems,
    mapInvoices,
    mapProducts,
    mapRecentPurchases,
    mapToCustomer,
    mapToProduct
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

export async function getInvoices(nextToken:string, limit:number, searchQuery:string): Promise<InvoicePaginationType>{
    const queryResult = await getByType('invoice', nextToken, limit, searchQuery);
    const invoices:Invoice[] = mapInvoices(queryResult?.data?.items);
    //const completeInvoices:CompleteInvoice[] = mapCompleteInvoices();
    return {invoices, nextToken: queryResult?.data?.nextToken ? queryResult?.data?.nextToken : '' };
}

export async function getProductsByCategory(category: string){
    const queryResult =  await client.queries.getProductsByCategory({category : category})
    return mapProducts(queryResult?.data?.items);
}

export async function scan(){
    return await client.queries.scan();
}

async function getBySKAndType(sk: string, type: string){
    return await client.queries.getBySKandType({sk : sk, type: type})
}

export async function getInvoicesByCustomer(customer: string){
    const queryResult =  await getBySKAndType(customer, 'invoice')
    return mapInvoices(queryResult?.data?.items);
}

async function getByPK(pk: string){
    return await client.queries.getByPK({pk : pk})
}

//this returns all entries for a invoice with pk {invoice} regardless of type
//TODO consider typing for composite
export async function getSingleInvoiceInfo(invoice: string){
  return await getByPK(invoice);
}

export async function getRecentInvoices(): Promise<Invoice[]> {
    const queryResult =  await client.queries.getRecentInvoices({type: 'invoice'});
    return mapInvoices(queryResult?.data?.items);
}

export async function batchGetItem(ids:string[] | undefined){
    if(ids !== undefined){
        return await client.queries.batchGetItem({ids});
    }
}

export async function getAggregateInformation(){
    const year = new Date().getFullYear();
    const queryResult =  await client.queries.getAggregateInformation({year: year.toString()});
    return mapDataItems(queryResult?.data?.items);
}

export async function getRecentPurchases(){
    const queryResult =  await client.queries.getRecentPurchases();
    return mapRecentPurchases(queryResult?.data?.items);
}

