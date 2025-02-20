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
import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  create(@Body() store: Partial<Store>): Promise<Store> {
    return this.storesService.create(store);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() store: Partial<Store>,
  ): Promise<Store> {
    return this.storesService.update(+id, store);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storesService.remove(+id);
  }
}
