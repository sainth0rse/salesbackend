import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StoreProductsService } from './store-products.service';
import { StoreProduct } from './entities/store-product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('store-products')
@UseGuards(JwtAuthGuard)
export class StoreProductsController {
  constructor(private readonly storeProductsService: StoreProductsService) {}

  @Get()
  findAll(): Promise<StoreProduct[]> {
    return this.storeProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StoreProduct> {
    return this.storeProductsService.findOne(+id);
  }

  @Post()
  create(@Body() storeProduct: Partial<StoreProduct>): Promise<StoreProduct> {
    return this.storeProductsService.create(storeProduct);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() storeProduct: Partial<StoreProduct>,
  ): Promise<StoreProduct> {
    return this.storeProductsService.update(+id, storeProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storeProductsService.remove(+id);
  }
}
