import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { User } from '../users/entities/user.entity';
import { TodoRepository } from './repositories/todo.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly todoRepo: TodoRepository,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(input: CreateTodoInput): Promise<Todo> {
    const user = await this.usersRepo.findOne({ where: { id: input.userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.todoRepo.createTodo({
      title: input.title,
      completed: false,
      userId: user.id,
    });
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepo.findAll();
  }

  findByUser(userId: number): Promise<Todo[]> {
    return this.todoRepo.findByUser(userId);
  }

  async updateForUser(userId: number, input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoRepo.findById(input.id);
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId !== userId) throw new ForbiddenException('Not your todo');

    if (typeof input.title === 'string') todo.title = input.title;
    if (typeof input.completed === 'boolean') todo.completed = input.completed;

    return this.todoRepo.save(todo);
  }

  async removeForUser(userId: number, id: number): Promise<boolean> {
    const todo = await this.todoRepo.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId !== userId) throw new ForbiddenException('Not your todo');

    await this.todoRepo.remove(todo);
    return true;
  }
}
