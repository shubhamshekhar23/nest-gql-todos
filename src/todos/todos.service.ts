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

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(input: CreateTodoInput): Promise<Todo> {
    const user = await this.usersRepo.findOne({ where: { id: input.userId } });
    if (!user) throw new NotFoundException('User not found');

    const todo = this.repo.create({
      title: input.title,
      completed: false,
      userId: user.id,
    });
    return this.repo.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.repo.find();
  }

  findByUser(userId: number): Promise<Todo[]> {
    return this.repo.find({ where: { userId } });
  }

  async updateForUser(userId: number, input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.repo.findOne({ where: { id: input.id } });
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId !== userId) throw new ForbiddenException('Not your todo');

    if (typeof input.title === 'string') todo.title = input.title;
    if (typeof input.completed === 'boolean') todo.completed = input.completed;

    return this.repo.save(todo);
  }

  async removeForUser(userId: number, id: number): Promise<boolean> {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId !== userId) throw new ForbiddenException('Not your todo');

    await this.repo.remove(todo);
    return true;
  }
}
