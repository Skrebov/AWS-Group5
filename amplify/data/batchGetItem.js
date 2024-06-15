import {util} from '@aws-appsync/utils';

export function request(ctx) {
    return {
        operation: 'BatchGetItem',
        tables: {
            appdata: {
                keys: ctx.args.ids.map((id) => util.dynamodb.toMapValues({pk: id, sk: id})),
            },
        }
    }
}


/**
 * Response handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The result object directly from the DynamoDB query response.
 */
export function response(ctx) {
    if (ctx.error) {
        util.error(ctx.error.message, ctx.error.type, null, ctx.result.data.unprocessedKeys);
    }
    return ctx.result.data;
}
