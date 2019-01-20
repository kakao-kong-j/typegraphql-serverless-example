import { MaxLength, Length, IsEmail, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";

import { User } from "../model/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @MinLength(3)
  @MaxLength(30)
  firstName!: string;

  @Field()
  @MinLength(3)
  @MaxLength(30)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;
}
