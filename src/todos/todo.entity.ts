import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@ObjectType()
@Entity()
export class Todo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ default: false })
  completed: boolean;

  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
