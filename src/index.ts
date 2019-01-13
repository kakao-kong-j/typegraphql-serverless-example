import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import serverless from "serverless-http";

import { RegisterResolver } from "./modules/user/Register";

const app = Express();

dotenv.config({ path: "../.env" });
const main = async () => {
  const port = process.env.PORT || 4000;
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app });

  app.listen(port);
};

main();

module.exports.handler = serverless(app);
