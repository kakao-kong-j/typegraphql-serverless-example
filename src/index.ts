import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { formatArgumentValidationError, buildSchemaSync } from "type-graphql";
import { createConnection, Connection } from "typeorm";
import { User } from "./model/User";
import { CreateUserResolver } from "./modules/user/createUser";

const serverless = require("serverless-http");

const app = Express();

const main = async () => {
  const port = process.env.PORT || 3000;
  const schema = await buildSchemaSync({
    resolvers: [CreateUserResolver]
  });
  await createConnection({
    type: "mysql",
    database: "serverless",
    username: "",
    password: "",
    port: 3306,
    host: "",
    entities: [User],
    synchronize: true,
    logging: "all"
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
