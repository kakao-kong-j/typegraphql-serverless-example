import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  password!: string;
}
