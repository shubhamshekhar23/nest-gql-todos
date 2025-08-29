// src/todos/todo.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  async createTodo(data: Partial<Todo>): Promise<Todo> {
    const todo = this.repo.create(data);
    return this.repo.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.repo.find();
  }

  findByUser(userId: number): Promise<Todo[]> {
    return this.repo.find({ where: { userId } });
  }

  findById(id: number): Promise<Todo | null> {
    return this.repo.findOne({ where: { id } });
  }

  save(todo: Todo): Promise<Todo> {
    return this.repo.save(todo);
  }

  async remove(todo: Todo): Promise<void> {
    await this.repo.remove(todo);
  }
}
