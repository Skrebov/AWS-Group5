import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth'
import {InvoiceProduct} from "./model";

const session = await fetchAuthSession();
const token = session.tokens?.idToken

export async function getInvoiceProducts(invoiceId: string) {
    const path:string = `invoices/${invoiceId.slice(2)}`;
    try {
        const restOperation = get({
            apiName: 'myRestApi',
            path: path,
            options: {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        });
        const { body }  = await restOperation.response;
        //console.log('GET call succeeded: ', body);
        return await body.json() as InvoiceProduct[];
    } catch (error:any) {
        console.log('GET call failed: ', JSON.parse(error.response.body));
        return [];
    }
}

export async function getRecommendations(customerId: string) {
    const path:string = `recommendations/${customerId.slice(2)}`;
    try {
        const restOperation = get({
            apiName: 'myRestApi',
            path: path,
            options: {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        });
        const { body }  = await restOperation.response;
        //console.log('GET call succeeded: ', body);
        return await body.json() as [];
    } catch (error:any) {
        console.log('GET call failed: ', JSON.parse(error.response.body));
        return [];
    }
}