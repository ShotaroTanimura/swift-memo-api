import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const tableName = "swift-test-memodb";
  const accountId = event.pathParameters.id;
  console.log(typeof accountId)
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression:
      "accountId = :accountId",
    ExpressionAttributeValues: {
      ":accountId": accountId,
    },
    ConsistentRead: true,
  });
  try{
    const response = await docClient.send(command);
    console.log(response);
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items)
    };

  }catch(err){
    console.log(err)
    return {statusCode: 500}
  }

};
