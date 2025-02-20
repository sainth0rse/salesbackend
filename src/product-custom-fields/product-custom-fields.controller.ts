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
// Убираем import { Request } from 'express', так как он дублирует

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number };
}

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
    @Request() req: Request, // Используем Request из @nestjs/common
  ): Promise<ProductCustomField> {
    const user = (req as ExpressRequest).user; // Явно кастим к нашему интерфейсу
    return this.customFieldsService.create(customField, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() customField: Partial<ProductCustomField>,
    @Request() req: Request,
  ): Promise<ProductCustomField> {
    const user = (req as ExpressRequest).user;
    return this.customFieldsService.update(+id, customField, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request): Promise<void> {
    const user = (req as ExpressRequest).user;
    return this.customFieldsService.remove(+id, user.id);
  }
}
