import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module'; // Импортируем UsersModule

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UsersModule], // Добавляем UsersModule
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService], // Уже экспортируем для других модулей
})
export class ProductsModule {}
