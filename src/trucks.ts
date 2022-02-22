import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import * as yup from "yup";
import Responses from "./Responses";
import { handleError, HttpError } from "./utils/utils";
let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}
if (process.env.JEST_WORKER_ID) {
  options = {
    endpoint: "http://localhost:8000",
    region: "local-env",
    sslEnabled: false,
  };
}
const docClient = new AWS.DynamoDB.DocumentClient(options);
const tableName = "TrucksTable";

const parcelSchema = yup
  .array()
  .of(yup.object().shape({ name: yup.string().required(), weight: yup.number().required() }))
  .default([]);
const schema = yup.object().shape({
  name: yup.string().required(),
  weight: yup.number().default(0),
  parcelsNumber: yup.number().default(0),
  parcels: parcelSchema,
});

export const createTruck = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const truck = {
      ...reqBody,
      parcels: reqBody.parces || [],
      parcelsNumber: 0,
      truckID: reqBody.truckID || v4(),
    };

    await docClient
      .put({
        TableName: tableName,
        Item: truck,
      })
      .promise();

    return Responses._201(truck);
  } catch (e) {
    return handleError(e);
  }
};
export const loadTruck = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;

    const currentTruck = await fetchTruckById(id);
    const reqBody = JSON.parse(event.body as string);

    await parcelSchema.validate(reqBody.parcels, { abortEarly: false });
    const parcels = [...currentTruck.parcels, ...reqBody.parcels];
    let weight = 0;
    let parcelsNumber = parcels.length;
    parcels.forEach((item) => (weight += item.weight));
    const truck = { ...currentTruck, parcelsNumber, weight, parcels: parcels };

    await docClient
      .put({
        TableName: tableName,
        Item: truck,
      })
      .promise();

    return Responses._200(truck);
  } catch (e) {
    return handleError(e);
  }
};
export const unloadTruck = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;
    const currentTruck = await fetchTruckById(id);

    const truck = { ...currentTruck, parcelsNumber: 0, weight: 0, parcels: [] };

    await docClient
      .put({
        TableName: tableName,
        Item: truck,
      })
      .promise();

    return Responses._200(truck);
  } catch (e) {
    return handleError(e);
  }
};
const fetchTruckById = async (id: string) => {
  const output = await docClient
    .get({
      TableName: tableName,
      Key: {
        truckID: id,
      },
    })
    .promise();

  if (!output.Item) {
    throw new HttpError(404, { error: "not found" });
  }

  return output.Item;
};

export const getTruck = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const truck = await fetchTruckById(event.pathParameters?.id as string);

    return Responses._200(truck);
  } catch (e) {
    return handleError(e);
  }
};

export const deleteTruck = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string;

    await fetchTruckById(id);

    await docClient
      .delete({
        TableName: tableName,
        Key: {
          TruckID: id,
        },
      })
      .promise();

    return {
      statusCode: 204,
      body: "deleted",
    };
  } catch (e) {
    return handleError(e);
  }
};

export const listTruck = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const output = await docClient
    .scan({
      TableName: tableName,
    })
    .promise();

  return Responses._200(output.Items);
};
