import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { Todo } from './entities/todo.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [TodosService, TodosResolver],
  exports: [TodosService],
})
export class TodosModule {}
