import { DataMapper } from '@aws/dynamodb-data-mapper';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import uuid from 'uuid/v4';

import { User } from '../../entity/User';
import { DynamoDB } from 'aws-sdk/clients/all';
import { UserInput } from '../../type/userInput';

@Resolver(User)
export class CreateUserResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async createUser(@Arg('input') userInput: UserInput): Promise<User> {
    const { email, firstName, lastName, password } = userInput;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: uuid(),
      firstName,
      lastName,
      email,
      password: hashedPassword
    };

    const mapper = new DataMapper({
      client: new DynamoDB({
        region: 'ap-northeast-2',
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key
      })
    });

    const toSave = Object.assign(new User(), user);
    await mapper.put(toSave);
    return toSave;
  }
}
