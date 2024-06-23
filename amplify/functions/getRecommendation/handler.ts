import {DynamoDB, PersonalizeRuntime} from "aws-sdk";
import type {APIGatewayProxyHandler} from "aws-lambda";
import {Product} from "../../utils/model";

const dynamoDb = new DynamoDB.DocumentClient();
const personalizeRuntime = new PersonalizeRuntime();

export const handler: APIGatewayProxyHandler = async (event: any): Promise<any> => {
    try {
        const {customerIdNumber} = event.pathParameters;
        const customerId = `c#${customerIdNumber}`;
        const num_items = 5
        const recommendation_type = 'for_you'  // 'for_you' or 'best_sellers'
      const res = await personalizeRuntime.getRecommendations({
            recommenderArn: "arn:aws:personalize:eu-central-1:637423640136:recommender/for-you-recommender",
            userId: customerId,
            numResults: num_items
        }).promise()

        if(res.itemList){
            const productKeys = res.itemList.map((item => ({pk: item.itemId, sk: item.itemId})));
            // Batch get product prices
            const batchGetParams = {
                RequestItems: {
                    ['appdata']: {
                        Keys: productKeys
                    }
                }
            };

            const batchGetData = await dynamoDb.batchGet(batchGetParams).promise();
            const products = batchGetData.Responses!['appdata'] as Product[];

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                    "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
                },
                body: JSON.stringify(products)
            };
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify({error: 'Could not retrieve data', details: error.message})
        };
    }

}