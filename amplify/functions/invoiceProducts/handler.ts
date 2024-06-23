import {DynamoDB} from 'aws-sdk';
import type {APIGatewayProxyHandler} from "aws-lambda";
import {Product, InvoiceProduct} from "../../utils/model";

const dynamoDb = new DynamoDB.DocumentClient();



export const handler: APIGatewayProxyHandler = async (event: any): Promise<any> => {

    try {
        const {invoiceId} = event.pathParameters;
        const params = {
            TableName: 'appdata',
            KeyConditionExpression: '#pk = :pk',
            ExpressionAttributeNames: {
                '#pk': 'pk',
            },
            ExpressionAttributeValues: {
                ':pk': `i#${invoiceId}`,
            }
        };
        const data = await dynamoDb.query(params).promise();
        let invoiceItems: InvoiceProduct[] = data.Items as InvoiceProduct[];
        invoiceItems = invoiceItems.filter(ii => ii.type === 'invoice_product')
        const productKeys = Array.from(invoiceItems).map((invoiceItem => ({pk: invoiceItem.sk, sk: invoiceItem.sk})));


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

        // Create a map of products for easy lookup
        const productMap = new Map<string, Product>();
        products.forEach(product => {
            productMap.set(product.pk, product);
        });

        // Populate the product field in each invoice item
        invoiceItems.forEach(invoiceItem => {
            invoiceItem.product = productMap.get(invoiceItem.sk);
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify(invoiceItems)
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
};