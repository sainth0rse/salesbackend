import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { UsersModule } from '../users/users.module'; // Импортируем UsersModule

@Module({
  imports: [TypeOrmModule.forFeature([Store]), UsersModule], // Добавляем UsersModule
  providers: [StoresService],
  controllers: [StoresController],
  exports: [StoresService], // Экспортируем сервис для других модулей
})
export class StoresModule {}
