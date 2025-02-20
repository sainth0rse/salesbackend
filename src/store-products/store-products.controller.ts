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

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number };
}

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
  create(
    @Body() storeProduct: Partial<StoreProduct>,
    @Request() req: Request,
  ): Promise<StoreProduct> {
    const user = (req as ExpressRequest).user;
    return this.storeProductsService.create(storeProduct, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() storeProduct: Partial<StoreProduct>,
    @Request() req: Request,
  ): Promise<StoreProduct> {
    const user = (req as ExpressRequest).user;
    return this.storeProductsService.update(+id, storeProduct, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request): Promise<void> {
    const user = (req as ExpressRequest).user;
    return this.storeProductsService.remove(+id, user.id);
  }
}
