import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'
import { data } from './data/resource';
import {aws_dynamodb} from "aws-cdk-lib";
import {getMonthlyAggregate} from "./functions/monthlyAggregate/resource"
import * as iam from "aws-cdk-lib/aws-iam"


const backend = defineBackend({
  auth,
  data,
  getMonthlyAggregate
});

const externalDataSourcesStack = backend.createStack("TestExternalTableStack");

const externalTable = aws_dynamodb.Table.fromTableAttributes(
    externalDataSourcesStack,
    "appdata",
    {
      tableArn: "arn:aws:dynamodb:eu-central-1:637423640136:table/appdata",
      globalIndexes: ['type_index', 'category_index', 'inverse_index', 'type-date-index']
    }
)

backend.data.addDynamoDbDataSource(
    "appDataDataSource",
    externalTable
);

const getMonthlyAggregateLambda = backend.getMonthlyAggregate.resources.lambda;
const statement = new iam.PolicyStatement({
    sid: "AllowPublishToDigest",
    actions: [	"dynamodb:BatchGetItem",
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:Query",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:ConditionCheckItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:DescribeTable"],
    resources: ["arn:aws:dynamodb:eu-central-1:637423640136:table/appdata",
        "arn:aws:dynamodb:eu-central-1:637423640136:table/appdata/index/*"],
})

getMonthlyAggregateLambda.addToRolePolicy(statement);


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