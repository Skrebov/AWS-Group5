import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'
import { data } from './data/resource';
import { aws_dynamodb } from "aws-cdk-lib";

const backend = defineBackend({
  auth,
  data,
});

const externalDataSourcesStack = backend.createStack("TestExternalTableStack");

const externalTable = aws_dynamodb.Table.fromTableAttributes(
  externalDataSourcesStack,
  "appdata",
  {
    tableArn: "arn:aws:dynamodb:eu-central-1:637423640136:table/appdata",
    globalIndexes: ['type_index', 'category_index', 'inverse_index']
  }
)

backend.data.addDynamoDbDataSource(
  "appDataDataSource",
  externalTable
);


//extract L1 CfnUserPool resources
const { cfnUserPool } = backend.auth.resources.cfnResources;
// update the schema property to add custom attributes
if (Array.isArray(cfnUserPool.schema)) {
  cfnUserPool.schema.push({
    name: 'owner',
    attributeDataType: 'Boolean',
    developerOnlyAttribute: false,
  });
}