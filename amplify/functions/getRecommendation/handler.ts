import {DynamoDB, PersonalizeRuntime} from "aws-sdk";
import type {APIGatewayProxyHandler} from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();
const personalizeRuntime = new PersonalizeRuntime();

export const handler: APIGatewayProxyHandler = async (event: any): Promise<any> => {
    try {
        const {customerIdNumber} = event.pathParameters;
        const customerId = `c#${customerIdNumber}`;
        const num_items = 10
        const recommendation_type = 'for_you'  // 'for_you' or 'best_sellers'
        const response = personalizeRuntime.getRecommendations({
            recommenderArn: "arn:aws:personalize:eu-central-1:637423640136:recommender/for-you-recommender",
            userId: customerId,
            numResults: num_items
        },(err, result) => {
            return result.itemList?.map((item: any) => item.itemId)
        })
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify(response)
        };
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