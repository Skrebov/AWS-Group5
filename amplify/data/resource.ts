import {type ClientSchema, a, defineData} from "@aws-amplify/backend";

const schema = a.schema({
    appdata: a.customType({
        pk: a.id().required(),
        sk: a.id().required(),
        birthdate: a.string(),
        date: a.string(),
        email: a.string(),
        gender: a.string(),
        name: a.string(),
        phone: a.string(),
        quantity: a.integer(),
        type: a.string().required(),
    }),

    getByPKandSK: a
        .query()
        .arguments({ pk: a.id().required(), sk: a.id().required() })
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
        .returns(a.ref("appdata").array())
        .authorization(allow => [allow.authenticated("userPools")])
        .handler(
            a.handler.custom({
                dataSource: "appDataDataSource",
                entry: "./getByType.js",
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
        // apiKeyAuthorizationMode: {
        //   expiresInDays: 30,
        // },
    },
});
