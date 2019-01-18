import { ObjectType, Field, ID } from "type-graphql";
import {
  attribute,
  hashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";
@ObjectType()
@table("User")
export class User {
  @Field(() => ID)
  @hashKey()
  id!: string;

  @Field()
  @attribute()
  firstName!: string;

  @Field()
  @attribute()
  lastName!: string;

  @Field()
  @attribute()
  email!: string;

  @Field()
  name!: string;

  @attribute()
  password!: string;
}
