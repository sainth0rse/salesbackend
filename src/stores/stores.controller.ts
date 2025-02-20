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
import { OwnershipGuard } from '../ownership/ownership.guard';

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number };
}

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
  create(
    @Body() store: Partial<Store>,
    @Request() req: Request,
  ): Promise<Store> {
    const user = (req as ExpressRequest).user;
    return this.storesService.create(store, user.id);
  }

  @Put(':id')
  @UseGuards(OwnershipGuard)
  @SetMetadata('entityType', 'store')
  update(
    @Param('id') id: string,
    @Body() store: Partial<Store>,
    @Request() req: Request,
  ): Promise<Store> {
    const user = (req as ExpressRequest).user;
    return this.storesService.update(+id, store, user.id);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  @SetMetadata('entityType', 'store')
  remove(@Param('id') id: string, @Request() req: Request): Promise<void> {
    const user = (req as ExpressRequest).user;
    return this.storesService.remove(+id, user.id);
  }
}
