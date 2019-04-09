import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx
} from "type-graphql";
import bcrypt from "bcryptjs";
import uuid from "uuid/v4";

import { User } from "../../model/User";
import { UserInput } from "../../type/userInput";
import { getConnection } from "typeorm";

@Resolver(User)
export class CreateUserResolver {
  @Query(() => User)
  async getUser(@Arg("id") id: string): Promise<User> {
    const connection = await getConnection();
    const user = await connection.getRepository(User).findOne(id);
    if (!user) {
      throw Error("user is not exist");
    }
    return user;
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async createUser(@Arg("input") userInput: UserInput): Promise<User> {
    const connection = await getConnection();
    const { email, firstName, lastName, password } = userInput;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: uuid(),
      firstName,
      lastName,
      email,
      password: hashedPassword
    };
    return await connection.getRepository(User).save(user);
  }
}
