import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from './entities/store-product.entity';
import { StoreProductsService } from './store-products.service';
import { StoreProductsController } from './store-products.controller';
import { User } from '../users/entities/user.entity';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreProduct, User, Product, Store]),
    forwardRef(() => ProductsModule),
    forwardRef(() => StoresModule),
  ],
  providers: [StoreProductsService],
  controllers: [StoreProductsController],
  exports: [StoreProductsService],
})
export class StoreProductsModule {}
