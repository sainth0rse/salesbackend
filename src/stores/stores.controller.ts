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
import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnershipGuard } from '../auth/ownership.guard';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll(): Promise<Store[]> {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Store> {
    return this.storesService.findOne(+id);
  }

  @Post()
  create(@Body() store: Partial<Store>, @Request() req): Promise<Store> {
    const user = req.user as { id: number }; // Получаем id пользователя из JWT
    return this.storesService.create(store, user.id);
  }

  @Put(':id')
  @UseGuards(OwnershipGuard)
  @SetMetadata('entityType', 'store')
  update(
    @Param('id') id: string,
    @Body() store: Partial<Store>,
    @Request() req,
  ): Promise<Store> {
    const user = req.user as { id: number };
    return this.storesService.update(+id, store, user.id);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  @SetMetadata('entityType', 'store')
  remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user = req.user as { id: number };
    return this.storesService.remove(+id, user.id);
  }
}
