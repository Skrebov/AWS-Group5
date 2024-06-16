import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth'
import {DataItem} from "./model";

const session = await fetchAuthSession();
const token = session.tokens?.idToken

export async function getMonthlyAggregate() {
    try {
        const restOperation = get({
            apiName: 'myRestApi',
            path: 'aggregate',
            options: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
        const { body }  = await restOperation.response;
        //console.log('GET call succeeded: ', body);
        return await body.json() as DataItem[];
    } catch (error:any) {
        console.log('GET call failed: ', JSON.parse(error.response.body));
        return [];
    }
}