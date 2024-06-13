import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

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
        .arguments({ type: a.string().required() })
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
        .arguments({ category: a.string().required() })
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

    addItem: a
        .mutation()
        .arguments({
            pk: a.string().required(),
            sk: a.string().required(),
            type: a.string().required(),
            birthdate: a.string(),
            email: a.string(),
            gender: a.string(),
            name: a.string(),
            phone: a.string(),
            date: a.string(),
            price: a.string(),
            quantity: a.float(),
            category: a.string(),
        })
        .returns(a.ref("appdata"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./addItem.js",
            })
        ),

    deleteByPKandSK: a
        .mutation()
        .arguments({
            pk: a.string().required(),
            sk: a.string().required(),
        })
        .returns(a.ref("appdata"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./deleteByPKandSK.js",
            })
        ),

    deleteByPKandType: a
        .mutation()
        .arguments({
            pk: a.string().required(),
            type: a.string().required(),
        })
        .returns(a.ref("listReturnType"))
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./deleteByPKandType.js",
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
