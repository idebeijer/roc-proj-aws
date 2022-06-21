import {
  DynamoDBClient,
  ListTablesCommand,
  ExecuteStatementCommand,
} from "@aws-sdk/client-dynamodb";
import { toTimestamp } from "@/utils/time.helpers";

export const executeQuery = async (params) => {
  const startDate = toTimestamp(params.startDate);
  const endDate = toTimestamp(params.endDate);

  const dynamoClient = new DynamoDBClient({
    region: params.region,
    endpoint: params.endpoint,
    credentials: {
      accessKeyId: params.accessKeyId,
      secretAccessKey: params.accessSecretKey,
    },
  });

  const statementOptions = {
    Statement: `SELECT * FROM "esptest_data" WHERE "LocationId" = '${params.locationId}' AND "CreationDate" BETWEEN '${startDate}' AND '${endDate}'`,
    Limit: 50,
  };

  try {
    const results = await dynamoClient.send(new ExecuteStatementCommand(statementOptions));
    if (results.$metadata.httpStatusCode === 200) {
      if (results.Items.length > 0) {
        return {
          status: "success",
          results: results,
        };
      } else {
        return {
          status: false,
          message: "No data found",
        };
      }
    } else {
      return {
        status: false,
        message: "Failed connection",
      };
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
