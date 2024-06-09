/**
 * Request handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The request object formatted for DynamoDB Query operation.
 */
export function request(ctx) {
    return {
        operation: 'Query',
        query: {
            expression: '#category = :category',
            expressionNames: {
                '#category': 'category'
            },
            expressionValues: {
                ":category" : { "S" : ctx.args.category }
            }
        },
        index: 'category_index',
        select: 'ALL_PROJECTED_ATTRIBUTES'
    };
}

/**
 * Response handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The result object directly from the DynamoDB query response.
 */
export const response = (ctx) => ctx.result;
