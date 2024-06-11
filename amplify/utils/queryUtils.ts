import {generateClient} from "aws-amplify/api";
import {Schema} from "../data/resource";
import {Customer} from "./model";
import {mapToCustomer} from "./mapper";

const client = generateClient<Schema>();

async function getByPKandSK (pk: string, sk: string ) {
    return await client.queries.getByPKandSK({pk : pk, sk: sk})
}

export async function getCustomer (customer: string): Promise<Customer> {
    return mapToCustomer(await getByPKandSK(customer, customer));
}

export async function getProduct (product: string) {
    return mapToCustomer(await getByPKandSK(product, product));
}

async function getByType(type: string){
    return await client.queries.getByType({type : type})
}

export async function getCustomers(){
    return await getByType('customer')
}

export async function getProducts(){
    return await getByType('product')
}

export async function getInvoices(){
    return await getByType('invoice')
}

export async function getProductsByCategory(category: string){
    return await client.queries.getProductsByCategory({category : category})
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

