import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import dotenv from "dotenv";

// import serverless from "serverless-http";

import { CreateUserResolver } from "./modules/user/createUser";

const app = Express();

dotenv.config({ path: "../.env" });
const main = async () => {
  const port = process.env.PORT || 4000;
  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });

  apolloServer.applyMiddleware({ app });

  app.listen(port);
};

main();

module.exports.handler = app;
// module.exports.handler = serverless(app);
