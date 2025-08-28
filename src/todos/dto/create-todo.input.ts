import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, IsString } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  title: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  userId: number;
}
