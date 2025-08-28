import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../../todos/entities/todo.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  // Not exposed in GraphQL (no @Field) to keep schema simple
  @Field(() => [Todo], { nullable: 'itemsAndList' })
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
