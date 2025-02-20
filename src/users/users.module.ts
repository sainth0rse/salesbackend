import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './user.service'; // Исправляем на './user.service'
import { UsersController } from './user.controller'; // Исправляем на './user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    UsersService,
    TypeOrmModule, // <-- добавляем, чтобы репозиторий User был доступен в других модулях
  ],
})
export class UsersModule {}
