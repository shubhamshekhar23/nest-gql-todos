import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TodosModule } from '../todos/todos.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TodosModule],
  providers: [UsersService, UsersResolver],
  exports: [TypeOrmModule],
})
export class UsersModule {}
