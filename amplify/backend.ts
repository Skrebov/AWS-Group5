import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'
import { data } from './data/resource';
import {aws_dynamodb, Stack} from "aws-cdk-lib";
import {getInvoiceProducts} from "./functions/invoiceProducts/resource"
import * as iam from "aws-cdk-lib/aws-iam"

import {
    AuthorizationType,
    CognitoUserPoolsAuthorizer,
    Cors,
    LambdaIntegration,
    RestApi
} from "aws-cdk-lib/aws-apigateway";
import {getRecommendation} from "./functions/getRecommendation/resource";

const backend = defineBackend({
  auth,
  data,
    getInvoiceProducts,
    getRecommendation
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

//lambda for monthly aggregate
const getInvoiceProductsLambda = backend.getInvoiceProducts.resources.lambda;
const getRecommendationLambda = backend.getRecommendation.resources.lambda;
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

const recommendationStatement = new iam.PolicyStatement({
    sid: "AllowPublishToDigest",
    actions: [
        "dynamodb:BatchGetItem",
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
        "dynamodb:DescribeTable",
        "personalize:*"
    ],
    resources: [
        "arn:aws:dynamodb:eu-central-1:637423640136:table/appdata",
        "arn:aws:dynamodb:eu-central-1:637423640136:table/appdata/index/*",
        "arn:aws:personalize:eu-central-1:637423640136:recommender/for-you-recommender"
    ]
});

getInvoiceProductsLambda.addToRolePolicy(statement);
getRecommendationLambda.addToRolePolicy(recommendationStatement);

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
const invoiceProductsLambdaIntegration = new LambdaIntegration(
    getInvoiceProductsLambda
);

const recommendationLambdaIntegration = new LambdaIntegration(
    getRecommendationLambda
)

// create a new Cognito User Pools authorizer
const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
    cognitoUserPools: [backend.auth.resources.userPool],
});

// create a new resource path with Cognito authorization
const invoicePath = myRestApi.root.addResource("invoices");
invoicePath.addResource("{invoiceId}")
    .addMethod("GET", invoiceProductsLambdaIntegration, {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: cognitoAuth, });

// create a new resource path with Cognito authorization
const recommendationsPath = myRestApi.root.addResource("recommendations");
recommendationsPath.addResource("{customerId}")
    .addMethod("GET", recommendationLambdaIntegration, {
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