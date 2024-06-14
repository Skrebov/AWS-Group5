
/**
 * Request handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The request object formatted for DynamoDB Query operation.
 */
export function request(ctx) {
    const { pk, sk, ...values } = ctx.args
    const updateExpression = Object.keys(values).map(key => `${key} = :${key}`).join(', ');
    const expressionValues = Object.entries(values).reduce((acc, [key, value]) => {
        acc[`:${key}`] = value;
        return acc;
    }, {});
    return {
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ pk, sk }),
        update: {
            expression: updateExpression,
            expressionValues
        },
    };
}

/**
 * Response handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The result object directly from the DynamoDB query response.
 */
export const response = (ctx) => ctx.result;


