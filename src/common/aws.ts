import { DynamoDB } from "aws-sdk/clients/all";

const ddb = new DynamoDB({
  region: "ap-northeast-2",
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});

export { ddb };
