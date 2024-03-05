import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const tableName = "swift-test-memodb";
  const body = JSON.parse(event.body);
  const {accountId, memoData} = body;
  const memoUUID = uuidv4();
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      accountId,
      memoUUID,
      memoData,
    },
  });
  try{
    const response = await docClient.send(command);
    console.log(response);
    return {statusCode: 200};
  }catch(err){
    console.log(err);
  }
};