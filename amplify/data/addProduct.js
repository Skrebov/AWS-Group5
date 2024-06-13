/**
 * Request handler for the AppSync resolver.
 *
 * @param {object} ctx - The context object provided by AppSync.
 * @returns {object} - The request object formatted for DynamoDB Query operation.
 */
export function request(ctx) {
    const { pk, sk, ...values} = ctx.args
    return {
      operation: 'PutItem',
      key: util.dynamodb.toMapValues({pk, sk}),
      attributeValues: util.dynamodb.toMapValues(values),
    };
  }
  
  
  /**
   * Response handler for the AppSync resolver.
   *
   * @param {object} ctx - The context object provided by AppSync.
   * @returns {object} - The result object directly from the DynamoDB query response.
   */
  export const response = (ctx) => ctx.result;
  
  
  