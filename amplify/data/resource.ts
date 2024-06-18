import {type ClientSchema, a, defineData} from "@aws-amplify/backend";

const schema = a.schema({
    appdata: a.customType({
        pk: a.string().required(),
        sk: a.string().required(),
        birthdate: a.string(),
        date: a.string(),
        email: a.string(),
        gender: a.string(),
        name: a.string(),
        phone: a.string(),
        price: a.string(),
        quantity: a.float(),
        category: a.string(),
        type: a.string().required(),
    }),

    aggregate: a.customType({
        'month_year': a.string().required(),
        'aggregation_type': a.string().required(),
        total: a.float(),
        year: a.string()
    }),

    recentPurchase: a.customType({
        pk: a.string().required(),
        date: a.string().required(),
        customerName: a.string(),
        email: a.string(),
        totalAmount: a.float(),
        type: a.string().required(),
    }),

    recentPurchaseList: a.customType({
        items: a.ref("recentPurchase").array(),
        nextToken: a.string()
    }),

    aggregateList: a.customType({
        items: a.ref("aggregate").array(),
        nextToken: a.string()
    }),

    listReturnType: a.customType({
        items: a.ref("appdata").array(),
        nextToken: a.string()
    }),

    getByPKandSK: a
        .query()
        .arguments({ pk: a.string().required(), sk: a.string().required() })
        .returns(a.ref("appdata"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getByPKandSK.js",
            })
        ),

    getByType: a
        .query()
        .arguments({ type: a.string().required()})
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getByType.js",
            })
        ),

    getProductsByCategory: a
        .query()
        .arguments({ category: a.string().required()})
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getProductsByCategory.js",
            })
        ),

    getBySKandType: a
        .query()
        .arguments({ sk: a.string().required(), type: a.string().required() })
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getBySKandType.js",
            })
        ),

    getByPK: a
        .query()
        .arguments({ pk: a.string().required() })
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getByPK.js",
            })
        ),

    getRecentInvoices: a
        .query()
        .arguments({ type: a.string().required() })
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getRecentInvoices.js",
            })
        ),

    batchGetItem: a
        .query()
        .arguments({ ids: a.string().array().required()})
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./batchGetItem.js",
            })
        ),

    scan: a
        .query()
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./scan.js",
            })
        ),

    getAggregateInformation: a
        .query()
        .arguments({ year: a.string().required()})
        .returns(a.ref("aggregateList"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "aggregationDataSource",
                entry: "./getAggregateByYear.js",
            })
        ),

    getRecentPurchases: a
        .query()
        .returns(a.ref("recentPurchaseList"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "recentPurchasesDataSource",
                entry: "./getRecentPurchases.js",
            })
        ),

})

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        // This tells the data client in your app (generateClient())
        // to sign API requests with the user authentication token.
        defaultAuthorizationMode: 'userPool',
    },
});
