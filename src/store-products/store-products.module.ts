import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from './entities/store-product.entity';
import { StoreProductsService } from './store-products.service';
import { StoreProductsController } from './store-products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProduct])],
  providers: [StoreProductsService],
  controllers: [StoreProductsController],
  exports: [StoreProductsService], // Экспортируем сервис
})
export class StoreProductsModule {}
