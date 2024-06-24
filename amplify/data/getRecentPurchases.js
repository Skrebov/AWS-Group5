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
                '#type': 'type',
            },
            expressionValues: {
                ":type" : { "S" : "rp" },
            }
        },
        index: 'type-date-index',
        scanIndexForward: false,
        limit: ctx.args.limit,
        nextToken: ctx.args.nextToken !== '' ? ctx.args.nextToken : undefined,
        select: 'ALL_PROJECTED_ATTRIBUTES',
        filter: {
            expression: '(contains (#customerName, :searchQuery) OR contains (#email, :searchQuery))',
            expressionNames: {
                '#customerName': 'customerName',
                '#email': 'email',
            },
            expressionValues: {
                ":searchQuery" : { "S" : ctx.args.searchQuery }
            }
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
