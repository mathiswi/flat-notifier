import * as aws from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

export async function writeIdToDb(id: string) {
  const dynamoDb = new aws.DynamoDB();

  const params: PutItemInput = {
    TableName: 'ebay',
    Item: {
      // @ts-ignore
      flatId: id,
    },
  };

  await dynamoDb.putItem(params).promise();
}
