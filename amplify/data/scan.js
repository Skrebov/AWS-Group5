export function request(ctx) {
    return { operation: 'Scan' };
}

export const response = (ctx) => ctx.result;
