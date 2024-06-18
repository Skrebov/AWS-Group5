import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'
import { data } from './data/resource';
import {aws_dynamodb, Stack} from "aws-cdk-lib";

const backend = defineBackend({
  auth,
  data,
});

const externalDataSourcesStack = backend.createStack("TestExternalTableStack");

//import the external table
const externalTable = aws_dynamodb.Table.fromTableAttributes(
    externalDataSourcesStack,
    "appdata",
    {
      tableArn: "arn:aws:dynamodb:eu-central-1:637423640136:table/appdata",
      globalIndexes: ['type_index', 'category_index', 'inverse_index', 'type-date-index']
    }
)

//import the external table
const externalAggregateTable = aws_dynamodb.Table.fromTableAttributes(
    externalDataSourcesStack,
    "AggregationTable",
    {
        tableArn: "arn:aws:dynamodb:eu-central-1:637423640136:table/AggregationTable",
        globalIndexes: ['year-month_year-index']
    }
)

//import the external table
const externalRecentPurchasesTable = aws_dynamodb.Table.fromTableAttributes(
    externalDataSourcesStack,
    "RecentPurchases",
    {
        tableArn: "arn:aws:dynamodb:eu-central-1:637423640136:table/RecentPurchases",
        globalIndexes: ['type-date-index']
    }
)

//add datasource to appsync graphql api
backend.data.addDynamoDbDataSource(
  "appDataDataSource",
  externalTable
);

//add datasource to appsync graphql api
backend.data.addDynamoDbDataSource(
    "aggregationDataSource",
    externalAggregateTable
);

//add datasource to appsync graphql api
backend.data.addDynamoDbDataSource(
    "recentPurchasesDataSource",
    externalRecentPurchasesTable
);

//extract L1 CfnUserPool resources
//makes if possible to have 2 groups of users in the cognito group
const { cfnUserPool } = backend.auth.resources.cfnResources;
// update the schema property to add custom attributes
if (Array.isArray(cfnUserPool.schema)) {
  cfnUserPool.schema.push({
    name: 'owner',
    attributeDataType: 'Boolean',
    developerOnlyAttribute: false,
  });
}