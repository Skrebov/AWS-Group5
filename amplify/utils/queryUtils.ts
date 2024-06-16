import {generateClient} from "aws-amplify/api";
import {Schema} from "../data/resource";
import {Customer, Invoice, Product} from "./model";
import {mapCustomers, mapInvoices, mapProducts, mapToCustomer, mapToProduct} from "./mapper";

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

async function getByType(type: string){
    return await client.queries.getByType({type : type});
}

export async function getCustomers(): Promise<Customer[]> {
    const queryResult = await getByType('customer');
    return mapCustomers(queryResult?.data?.items);
}

export async function getProducts(): Promise<Product[]> {
    const queryResult = await getByType('product');
    return mapProducts(queryResult?.data?.items);
}

export async function getInvoices(){
    const queryResult = await getByType('invoice');
    return mapInvoices(queryResult?.data?.items);
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


