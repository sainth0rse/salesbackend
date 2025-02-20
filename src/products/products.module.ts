import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module';
import { OwnershipModule } from '../ownership/ownership.module';
import { StoresModule } from '../stores/stores.module';
import { StoreProductsModule } from '../store-products/store-products.module';
import { ProductCustomFieldsModule } from '../product-custom-fields/product-custom-fields.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UsersModule,
    forwardRef(() => OwnershipModule),
    forwardRef(() => StoresModule),
    forwardRef(() => StoreProductsModule),
    forwardRef(() => ProductCustomFieldsModule),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
