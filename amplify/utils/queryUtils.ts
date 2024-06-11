import {generateClient} from "aws-amplify/api";
import {Schema} from "../data/resource";
import {Customer, Product} from "./model";
import {mapCustomers, mapProducts, mapToCustomer, mapToProduct} from "./mapper";

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
    return await getByType('invoice')
}

export async function getProductsByCategory(category: string){
    const queryResult =  await client.queries.getProductsByCategory({category : category})
    return mapProducts(queryResult?.data?.items);
}

export async function scan(){
    return await client.queries.scan();
}

export async function getBySKAndType(sk: string, type: string){
    return await client.queries.getBySKandType({sk : sk, type: type})
}

export async function getInvoicesByCustomer(customer: string){
    return getBySKAndType(customer, 'invoice')
}

export async function getByPK(pk: string){
    return await client.queries.getByPK({pk : pk})
}

//this returns all entries for a invoice with pk {invoice} regardless of type
export async function getSingleInvoiceInfo(invoice: string){
  return await getByPK(invoice);
}

