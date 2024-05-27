import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  // PERSON 
  Person: a
    .model({
      id_person: a.id().required(),
      name: a.string().required(),
      phone_number: a.string(),
      email: a.string().required(),
      gender: a.string(),
      birthday_date: a.timestamp(),
      is_owner: a.boolean().required(),
    })
    .identifier(["id_person"]),

  // ITEMS
  Item: a
    .model({
      id_item: a.id().required(),
      name: a.string().required(),
      quantity: a.integer().required(),
      type: a.string().required(),
      price: a.float().required(),
      creation_date: a.timestamp(),
    })
    .identifier(["id_item"]),

  // TRANSACTION
  Transaction: a
    .model({
      id_transaction: a.id().required(),
      id_receipt: a.id().required(),
      id_item: a.id().required(),
      quantity: a.integer().required(),
      price_per_item: a.float().required(),
    })
    .identifier(["id_transaction"]),
  
  // RECEIPT
  Receipt: a
    .model({
      id_receipt: a.id().required(),
      id_person: a.id().required(),
      date_of_purchase: a.timestamp().required(),
      total_price: a.float().required(),
    })
    .identifier(["id_receipt"]),
}).authorization(allow => [allow.owner()]);

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

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>