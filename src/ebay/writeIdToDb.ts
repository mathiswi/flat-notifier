import * as aws from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

export async function writeIdToDb(id: string) {
  const dynamoDb = new aws.DynamoDB({ region: 'eu-central-1' });
  console.log(`Writing ${id} to db`);

  const params: PutItemInput = {
    TableName: 'ebayTable',
    Item: {
      // @ts-ignore
      flatId: { S: id },
    },
  };

  await dynamoDb.putItem(params).promise();
}
