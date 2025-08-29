import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { Todo } from './entities/todo.entity';
import { User } from '../users/entities/user.entity';
import { TodoRepository } from './repositories/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [TodosService, TodosResolver, TodoRepository],
  exports: [TodosService],
})
export class TodosModule {}
