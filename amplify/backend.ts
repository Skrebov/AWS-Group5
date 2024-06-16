import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'
import { data } from './data/resource';
import {aws_dynamodb, Stack} from "aws-cdk-lib";
import {getMonthlyAggregate} from "./functions/monthlyAggregate/resource"
import * as iam from "aws-cdk-lib/aws-iam"
import {
    AuthorizationType,
    CognitoUserPoolsAuthorizer,
    Cors,
    LambdaIntegration,
    RestApi
} from "aws-cdk-lib/aws-apigateway";


const backend = defineBackend({
  auth,
  data,
  getMonthlyAggregate
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
//add datasource to appsync graphql api
backend.data.addDynamoDbDataSource(
    "appDataDataSource",
    externalTable
);
//lambda for monthly aggregate
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

// create a new API stack
const apiStack = backend.createStack("api-stack");

// create a new REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
    restApiName: "myRestApi",
    deploy: true,
    deployOptions: {
        stageName: "dev",
    },
    defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
        allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
        allowHeaders: Cors.DEFAULT_HEADERS,
    },
});

// create a new Lambda integration
const monthlyAggregateLambdaIntegration = new LambdaIntegration(
    getMonthlyAggregateLambda
);

// create a new Cognito User Pools authorizer
const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
    cognitoUserPools: [backend.auth.resources.userPool],
});

// create a new resource path with Cognito authorization
const aggregatePath = myRestApi.root.addResource("aggregate");
    aggregatePath.addMethod("GET", monthlyAggregateLambdaIntegration, {
        authorizationType: AuthorizationType.COGNITO,
        authorizer: cognitoAuth, });

// add outputs to the configuration file
backend.addOutput({
    custom: {
        API: {
            [myRestApi.restApiName]: {
                endpoint: myRestApi.url,
                region: Stack.of(myRestApi).region,
                apiName: myRestApi.restApiName,
            },
        },
    },
});

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