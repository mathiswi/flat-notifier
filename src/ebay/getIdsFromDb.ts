import * as aws from 'aws-sdk';

export async function getIdsFromDb(): Promise<string[] | undefined> {
  const dynamoDb = new aws.DynamoDB({ region: 'eu-central-1' });
  const params = {
    TableName: 'ebayTable',
  };

  const { Items } = await dynamoDb.scan(params).promise();
  const ids = Items?.map((item) => item.flatId.S as string);
  return ids;
}
