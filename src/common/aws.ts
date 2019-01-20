import { DynamoDB } from "aws-sdk/clients/all";

const ddb = new DynamoDB({
  region: "ap-northeast-2"
});

export { ddb };
