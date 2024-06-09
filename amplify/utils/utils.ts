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