import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { formatArgumentValidationError, buildSchemaSync } from "type-graphql";
import dotenv from "dotenv";

const serverless = require("serverless-http");

const app = Express();
dotenv.config({ path: "../.env" });

const main = async () => {
  const port = process.env.PORT || 3000;
  const schema = await buildSchemaSync({
    resolvers: [__dirname + "/modules/**/*.ts", __dirname + "/modules/**/*.js"]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });

  apolloServer.applyMiddleware({ app });

  app.listen(port);
};

main();

module.exports.handler = serverless(app);
