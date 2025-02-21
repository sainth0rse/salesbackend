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
  Request,
} from '@nestjs/common';
import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomField } from './entities/product-custom-field.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

// DTO для создания пользовательского поля продукта
class CreateProductCustomFieldDto {
  @IsNumber()
  productId!: number;

  @IsString()
  key!: string;

  @IsString()
  value!: string;
}

// DTO для обновления пользовательского поля продукта
class UpdateProductCustomFieldDto {
  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsString()
  @IsOptional()
  key?: string;

  @IsString()
  @IsOptional()
  value?: string;
}

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('product-custom-fields')
@Controller('product-custom-fields')
@UseGuards(JwtAuthGuard)
export class ProductCustomFieldsController {
  constructor(
    private readonly customFieldsService: ProductCustomFieldsService,
  ) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all custom fields for a product (admin) or user’s fields (client)',
  })
  @ApiQuery({
    name: 'productId',
    required: true,
    type: Number,
    description: 'Product ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return list of custom fields for the product',
  })
  @ApiBearerAuth()
  findAll(
    @Query('productId') productId: string,
  ): Promise<ProductCustomField[]> {
    return this.customFieldsService.findAll(+productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get custom field by ID' })
  @ApiResponse({ status: 200, description: 'Return custom field details' })
  @ApiResponse({ status: 404, description: 'Custom field not found' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<ProductCustomField> {
    return this.customFieldsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new custom field for a product' })
  @ApiBody({
    type: CreateProductCustomFieldDto,
    description: 'Custom field creation data',
    examples: {
      default: {
        value: {
          productId: 12,
          key: 'color',
          value: 'red',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'number', description: 'ID of the product' },
        key: { type: 'string', description: 'Key of the custom field' },
        value: { type: 'string', description: 'Value of the custom field' },
      },
      required: ['productId', 'key', 'value'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Custom field created successfully',
    type: ProductCustomField,
  })
  @ApiBearerAuth()
  create(
    @Body() customField: CreateProductCustomFieldDto,
    @Request() req: ExpressRequest,
  ): Promise<ProductCustomField> {
    return this.customFieldsService.create(customField, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update custom field by ID (owner only)' })
  @ApiBody({
    type: UpdateProductCustomFieldDto,
    description: 'Custom field update data',
    examples: {
      default: {
        value: {
          value: 'blue',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        productId: {
          type: 'number',
          description: 'ID of the product',
          nullable: true,
        },
        key: {
          type: 'string',
          description: 'Key of the custom field',
          nullable: true,
        },
        value: {
          type: 'string',
          description: 'Value of the custom field',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Custom field updated successfully',
    type: ProductCustomField,
  })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() customField: UpdateProductCustomFieldDto,
    @Request() req: ExpressRequest,
  ): Promise<ProductCustomField> {
    return this.customFieldsService.update(+id, customField, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete custom field by ID (owner only)' })
  @ApiResponse({
    status: 204,
    description: 'Custom field deleted successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  remove(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    return this.customFieldsService.remove(+id, req.user.id);
  }
}
