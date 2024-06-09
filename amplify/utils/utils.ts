import {generateClient} from "aws-amplify/api";
import {Schema} from "../data/resource";

const client = generateClient<Schema>();

export async function getByPKandSK (pk: string, sk: string ) {
    return await client.queries.getByPKandSK({pk : pk, sk: sk})
}

export async function getCustomer (pk: string){
    return await client.queries.getByPKandSK({pk : pk, sk: pk})
}

export async function getProduct (pk: string) {
    return await client.queries.getByPKandSK({pk : pk, sk: pk})
}

export async function getByType(type: string){
    return await client.queries.getByType({type : type})
}

export async function getCustomers(){
    return await client.queries.getByType({type : 'customer'})
}

export async function getProducts(){
    return await client.queries.getByType({type : 'product'})
}

export async function getProductsByCategory(category: string){
    return await client.queries.getProductsByCategory({category : category})
}

export async function batchGetByPK(pk: string){
    return await client.queries.batchGetByPK({pk : pk})
}

export async function getInvoices(pk: string){
    return await client.queries.batchGetByPK({pk : pk})
}

export async function scan(){
    return await client.queries.scan();
}