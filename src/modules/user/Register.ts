import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import * as uuid from "uuid/v4";

import { User } from "../../entity/User";
import { DynamoDB } from "aws-sdk/clients/all";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user: User = {
      id: uuid(),
      firstName,
      lastName,
      email,
      name: firstName + lastName,
      password: hashedPassword
    };

    const mapper = new DataMapper({
      client: new DynamoDB({
        region: "ap-northeast-2",
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key
      })
    });

    const toSave = Object.assign(new User(), user);
    await mapper.put(toSave);
    return user;
  }
}
