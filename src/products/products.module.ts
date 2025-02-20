import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UsersModule, // <-- добавили
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
