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
            expression: '#type = :type',
            expressionNames: {
                '#type': 'type'
            },
            expressionValues: {
                ":type" : {
                    "S" : ctx.args.type
                }
            }
        },
        index: 'type_index',
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
