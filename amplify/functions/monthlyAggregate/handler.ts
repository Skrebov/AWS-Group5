import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

interface Item {
    date: string;
    price: number;
}

interface MonthlyTotal {
    [key: string]: number;
}

exports.handler = async (event: any): Promise<any> => {
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
        const monthlyTotals: MonthlyTotal = {};

        data.Items?.forEach((item) => {
            const month = new Date(item.date).toLocaleString('default', { month: 'short' });
            if (!monthlyTotals[month]) {
                monthlyTotals[month] = 0;
            }
            monthlyTotals[month] += item.price;
        });

        const responseData = Object.keys(monthlyTotals).map(month => ({
            name: month,
            total: monthlyTotals[month]
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(responseData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve data' })
        };
    }
};