import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCustomField } from './entities/product-custom-field.entity';
import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomFieldsController } from './product-custom-fields.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCustomField])],
  providers: [ProductCustomFieldsService],
  controllers: [ProductCustomFieldsController],
  exports: [TypeOrmModule],
})
export class ProductCustomFieldsModule {}
