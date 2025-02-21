import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StoreProductsService } from './store-products.service';
import { StoreProduct } from './entities/store-product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

// DTO для создания связи магазина и продукта
class CreateStoreProductDto {
  @IsNumber()
  productId!: number;

  @IsNumber()
  storeId!: number;

  @IsNumber()
  @IsOptional()
  stock?: number;
}

// DTO для обновления связи магазина и продукта
class UpdateStoreProductDto {
  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @IsOptional()
  storeId?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;
}

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('store-products')
@Controller('store-products')
@UseGuards(JwtAuthGuard)
export class StoreProductsController {
  constructor(private readonly storeProductsService: StoreProductsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all store-product relations (admin) or user’s relations (client)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return list of store-product relations',
  })
  @ApiBearerAuth()
  findAll(@Request() req: ExpressRequest): Promise<StoreProduct[]> {
    return this.storeProductsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store-product relation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return store-product relation details',
  })
  @ApiResponse({ status: 404, description: 'Store-product relation not found' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<StoreProduct> {
    return this.storeProductsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new store-product relation' })
  @ApiBody({
    type: CreateStoreProductDto,
    description: 'Store-product relation creation data',
    examples: {
      default: {
        value: {
          productId: 12,
          storeId: 8,
          stock: 100,
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'number', description: 'ID of the product' },
        storeId: { type: 'number', description: 'ID of the store' },
        stock: {
          type: 'number',
          description: 'Stock quantity',
          nullable: true,
        },
      },
      required: ['productId', 'storeId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Store-product relation created successfully',
    type: StoreProduct,
  })
  @ApiBearerAuth()
  create(
    @Body() storeProduct: CreateStoreProductDto,
    @Request() req: ExpressRequest,
  ): Promise<StoreProduct> {
    return this.storeProductsService.create(storeProduct, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update store-product relation by ID (owner only)' })
  @ApiBody({
    type: UpdateStoreProductDto,
    description: 'Store-product relation update data',
    examples: {
      default: {
        value: {
          stock: 200,
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
        storeId: {
          type: 'number',
          description: 'ID of the store',
          nullable: true,
        },
        stock: {
          type: 'number',
          description: 'Stock quantity',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Store-product relation updated successfully',
    type: StoreProduct,
  })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() storeProduct: UpdateStoreProductDto,
    @Request() req: ExpressRequest,
  ): Promise<StoreProduct> {
    return this.storeProductsService.update(+id, storeProduct, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete store-product relation by ID (owner only)' })
  @ApiResponse({
    status: 204,
    description: 'Store-product relation deleted successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  remove(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    return this.storeProductsService.remove(+id, req.user.id);
  }
}
