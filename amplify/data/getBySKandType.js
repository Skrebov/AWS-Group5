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
            expression: '#sk = :sk',
            expressionNames: {
                '#sk': 'sk'
            },
            expressionValues: {
                ":sk": {"S": ctx.args.sk}
            }
        },
        index: 'inverse_index',
        select: 'ALL_PROJECTED_ATTRIBUTES',
        filter: {
            expression: '#type = :type',
            expressionNames: {
                '#type': 'type'
            },
            expressionValues: {
                ":type": {"S": ctx.args.type}
            }
        }
    }
}

/**
 * Response handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The result object directly from the DynamoDB query response.
 */
export const response = (ctx) => ctx.result;


