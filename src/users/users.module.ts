import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { ProductCustomField } from '../product-custom-fields/entities/product-custom-field.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';
import { StoreProduct } from '../store-products/entities/store-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ProductCustomField,
      Product,
      Store,
      StoreProduct,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
