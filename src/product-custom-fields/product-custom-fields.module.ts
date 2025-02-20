// product-custom-fields.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCustomField } from './entities/product-custom-field.entity';
import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomFieldsController } from './product-custom-fields.controller';
import { UsersModule } from '../users/users.module';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCustomField, Product, User]),
    UsersModule,
  ],
  providers: [ProductCustomFieldsService],
  controllers: [ProductCustomFieldsController],
  exports: [ProductCustomFieldsService],
})
export class ProductCustomFieldsModule {}
