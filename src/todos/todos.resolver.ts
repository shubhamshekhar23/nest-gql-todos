import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo])
  todos() {
    return this.todosService.findAll();
  }

  @Query(() => [Todo])
  todosByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.todosService.findByUser(userId);
  }

  @Mutation(() => Todo)
  createTodo(@Args('input') input: CreateTodoInput) {
    return this.todosService.create(input);
  }

  // Require userId to enforce ownership checks
  @Mutation(() => Todo)
  updateTodo(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('input') input: UpdateTodoInput,
  ) {
    return this.todosService.updateForUser(userId, input);
  }

  @Mutation(() => Boolean)
  deleteTodo(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.todosService.removeForUser(userId, id);
  }
}
