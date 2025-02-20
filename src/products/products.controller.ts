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
import { OwnershipGuard } from '../auth/ownership.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() product: Partial<Product>, @Request() req): Promise<Product> {
    const user = req.user as { id: number };
    return this.productsService.create(product, user.id);
  }

  @Put(':id')
  @UseGuards(OwnershipGuard as any) // Временный каст для устранения предупреждений
  @SetMetadata('entityType', 'product')
  update(
    @Param('id') id: string,
    @Body() product: Partial<Product>,
    @Request() req,
  ): Promise<Product> {
    const user = req.user as { id: number };
    return this.productsService.update(+id, product, user.id);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard as any) // Временный каст для устранения предупреждений
  @SetMetadata('entityType', 'product')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user = req.user as { id: number };
    return this.productsService.remove(+id, user.id);
  }
}
