import { DynamoDB } from 'aws-sdk';
import type { APIGatewayProxyHandler } from "aws-lambda";


const dynamoDb = new DynamoDB.DocumentClient();

interface InvoiceItem {
    date: string;
    type: string;
    pk: string;
    sk: string;
    quantity?: number;
    price?: number;
}

interface MonthlyTotal {
    [key: string]: number;
}

export const handler: APIGatewayProxyHandler = async (event: any): Promise<any> => {
    const params = {
        TableName: 'appdata',
        IndexName: 'type-date-index', // Use appropriate index
        KeyConditionExpression: '#type = :typeValue',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':typeValue': 'invoice'
        }
    };

    try {
        const data = await dynamoDb.query(params).promise();
        const invoiceItems: InvoiceItem[] = data.Items as InvoiceItem[];
        const monthlyTotals: MonthlyTotal = {};
        const productKeysSet = new Set<string>();
        const invoiceProductMap: { [invoiceId: string]: InvoiceItem[] } = {};

        for (const invoice of invoiceItems) {
            const invoiceId = invoice.pk;

            // Query to get invoice products
            const productParams = {
                TableName: 'appdata',
                KeyConditionExpression: '#pk = :pkValue and begins_with(#sk, :skPrefix)',
                ExpressionAttributeNames: {
                    '#pk': 'pk',
                    '#sk': 'sk'
                },
                ExpressionAttributeValues: {
                    ':pkValue': invoiceId,
                    ':skPrefix': 'p#' // Assuming sk for products starts with 'p#'
                }
            };

            const productData = await dynamoDb.query(productParams).promise();
            const products = productData.Items as InvoiceItem[];

            for (const product of products) {
                if (product.type === 'invoice_product') {
                    productKeysSet.add(`${product.sk}`);
                    if (!invoiceProductMap[invoiceId]) {
                        invoiceProductMap[invoiceId] = [];
                    }
                    invoiceProductMap[invoiceId].push(product);
                }
            }
        }

        // Convert set to array for BatchGetItem
        const productKeys = Array.from(productKeysSet).map(key => ({ pk: key, sk: key }));

        // Batch get product prices
        const batchGetParams = {
            RequestItems: {
                ['appdata']: {
                    Keys: productKeys
                }
            }
        };

        const batchGetData = await dynamoDb.batchGet(batchGetParams).promise();
        const products = batchGetData.Responses!['appdata'] as InvoiceItem[];

        const productPriceMap = products.reduce((acc, product) => {
            acc[product.pk] = product.price!;
            return acc;
        }, {} as { [key: string]: number });

        for (const invoice of invoiceItems) {
            const invoiceId = invoice.pk;
            const invoiceMonth = new Date(invoice.date).toLocaleString('default', { month: 'short' });

            if (invoiceProductMap[invoiceId]) {
                for (const product of invoiceProductMap[invoiceId]) {
                    const productPrice = productPriceMap[product.sk] || 0;

                    if (!monthlyTotals[invoiceMonth]) {
                        monthlyTotals[invoiceMonth] = 0;
                    }
                    monthlyTotals[invoiceMonth] += product.quantity! * productPrice;
                }
            }
        }

        const responseData = Object.keys(monthlyTotals).map(month => ({
            name: month,
            total: monthlyTotals[month]
        }));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify(responseData)
        };
    } catch (error:any) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
                "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
            },
            body: JSON.stringify({ error: 'Could not retrieve data', details: error.message })
        };
    }
};