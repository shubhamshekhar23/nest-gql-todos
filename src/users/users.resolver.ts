import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Todo } from 'src/todos/entities/todo.entity';
import { TodosService } from 'src/todos/todos.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly todosService: TodosService,
  ) {}

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @ResolveField(() => [Todo], { name: 'todos' })
  todos(@Parent() user: User) {
    // user.id should be available; fall back to userId if needed
    const userId = (user as any).id;
    return this.todosService.findByUser(userId);
  }
}
