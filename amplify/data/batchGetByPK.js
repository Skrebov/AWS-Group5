export function request(ctx) {
    return {
        operation: 'BatchGetItem',
        tables: {
            appdata: {
                keys: [
                    {
                        "pk" : { "S" : ctx.args.pk }
                    }
                ]
            },
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
