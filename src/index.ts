import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { formatArgumentValidationError, buildSchemaSync } from "type-graphql";
import { CreateUserResolver } from "src/modules/user/createUser";

const serverless = require("serverless-http");

const app = Express();

const main = async () => {
  const port = process.env.PORT || 3000;
  const schema = await buildSchemaSync({
    resolvers: [__dirname + "/modules/**/*.js"]
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
