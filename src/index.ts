import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv";

import { RegisterResolver } from "./modules/user/Register";

dotenv.config({ path: "../.env" });
const main = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
