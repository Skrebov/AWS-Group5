/**
 * Request handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The request object formatted for DynamoDB Query operation.
 */
export function request(ctx) {
    return {
        operation: 'PutItem',
        key: {
            pk: { S: ctx.args.pk },
            sk: { S: ctx.args.sk },
        },
        attributeValues: {
            birthdate: { S: ctx.args.birthdate },
            email: { S: ctx.args.email },
            type: { S: ctx.args.type },
        }
    };
}

/**
 * Response handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The result object directly from the DynamoDB query response.
 */
export const response = (ctx) => ctx.result;
