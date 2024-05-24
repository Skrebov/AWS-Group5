import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient();

function parseGroup(value: string) {
    return value === "true" ? "OWNER" : "WORKER"
}

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  const userRole = event.request.userAttributes['custom:owner'];
  console.log(userRole);
  const command = new AdminAddUserToGroupCommand({
    GroupName: parseGroup(userRole),
    Username: event.userName,
    UserPoolId: event.userPoolId
  });
  const response = await client.send(command);
  console.log('processed', response.$metadata.requestId);
  return event;
};