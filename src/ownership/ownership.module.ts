// ownership.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { OwnershipGuard } from './ownership.guard'; // <-- тот же каталог
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { StoreProductsModule } from '../store-products/store-products.module';
import { ProductCustomFieldsModule } from '../product-custom-fields/product-custom-fields.module';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    forwardRef(() => StoresModule),
    forwardRef(() => StoreProductsModule),
    forwardRef(() => ProductCustomFieldsModule),
  ],
  providers: [OwnershipGuard],
  exports: [OwnershipGuard],
})
export class OwnershipModule {}
