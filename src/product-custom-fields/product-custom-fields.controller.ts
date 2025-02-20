import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomField } from './entities/product-custom-field.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Убедись, что путь правильный

@Controller('product-custom-fields')
@UseGuards(JwtAuthGuard)
export class ProductCustomFieldsController {
  constructor(
    private readonly customFieldsService: ProductCustomFieldsService,
  ) {}

  @Get()
  findAll(
    @Query('productId') productId: string,
  ): Promise<ProductCustomField[]> {
    return this.customFieldsService.findAll(+productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductCustomField> {
    return this.customFieldsService.findOne(+id);
  }

  @Post()
  create(
    @Body() customField: Partial<ProductCustomField>,
  ): Promise<ProductCustomField> {
    return this.customFieldsService.create(customField);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() customField: Partial<ProductCustomField>,
  ): Promise<ProductCustomField> {
    return this.customFieldsService.update(+id, customField);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.customFieldsService.remove(+id);
  }
}
