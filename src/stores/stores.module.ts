import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { StoreProductsModule } from '../store-products/store-products.module';
import { ProductCustomFieldsModule } from '../product-custom-fields/product-custom-fields.module';
import { OwnershipModule } from '../ownership/ownership.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    UsersModule,

    forwardRef(() => ProductsModule),

    forwardRef(() => StoreProductsModule),
    ProductCustomFieldsModule,

    forwardRef(() => OwnershipModule),
  ],
  providers: [StoresService],
  controllers: [StoresController],
  exports: [StoresService],
})
export class StoresModule {}
