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
  SetMetadata,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnershipGuard } from '../ownership/ownership.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products (admin) or user’s products (client)',
  })
  @ApiResponse({ status: 200, description: 'Return list of products' })
  @ApiBearerAuth()
  findAll(@Request() req: ExpressRequest): Promise<Product[]> {
    return this.productsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Return product details' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiBearerAuth()
  create(
    @Body() product: Partial<Product>,
    @Request() req: ExpressRequest,
  ): Promise<Product> {
    return this.productsService.create(product, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @SetMetadata('entityType', 'product')
  @ApiOperation({ summary: 'Update product by ID (owner only)' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() product: Partial<Product>,
    @Request() req: ExpressRequest,
  ): Promise<Product> {
    return this.productsService.update(+id, product, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @SetMetadata('entityType', 'product')
  @ApiOperation({ summary: 'Delete product by ID (owner only)' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  remove(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    return this.productsService.remove(+id, req.user.id);
  }
}
