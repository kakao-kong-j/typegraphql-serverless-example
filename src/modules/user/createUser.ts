import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import bcrypt from "bcryptjs";
import uuid from "uuid/v4";

import { User } from "../../model/User";
import { UserInput } from "../../type/userInput";
import { ddb } from "../../common/aws";

const mapper = new DataMapper({
  client: ddb
});

@Resolver(User)
export class CreateUserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
  @Query(() => User)
  async getUser(@Arg("id") id: string): Promise<User> {
    return await mapper.get(Object.assign(new User(), { id }));
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async createUser(@Arg("input") userInput: UserInput): Promise<User> {
    const { email, firstName, lastName, password } = userInput;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: uuid(),
      firstName,
      lastName,
      email,
      password: hashedPassword
    };

    const toSave = Object.assign(new User(), user);
    await mapper.put(toSave);
    return toSave;
  }
}
