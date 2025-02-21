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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

// DTO для создания магазина
class CreateStoreDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  city?: string;
}

// DTO для обновления магазина
class UpdateStoreDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  city?: string;
}

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('stores')
@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stores (admin) or user’s stores (client)' })
  @ApiResponse({ status: 200, description: 'Return list of stores' })
  @ApiBearerAuth()
  findAll(@Request() req: ExpressRequest): Promise<Store[]> {
    return this.storesService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store by ID' })
  @ApiResponse({ status: 200, description: 'Return store details' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<Store> {
    return this.storesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({
    type: CreateStoreDto,
    description: 'Store creation data',
    examples: {
      default: {
        value: {
          name: 'Новый магазин',
          city: 'Москва',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the store' },
        city: {
          type: 'string',
          description: 'City of the store',
          nullable: true,
        },
      },
      required: ['name'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Store created successfully',
    type: Store,
  })
  @ApiBearerAuth()
  create(
    @Body() store: CreateStoreDto,
    @Request() req: ExpressRequest,
  ): Promise<Store> {
    return this.storesService.create(store, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @SetMetadata('entityType', 'store')
  @ApiOperation({ summary: 'Update store by ID (owner only)' })
  @ApiBody({
    type: UpdateStoreDto,
    description: 'Store update data',
    examples: {
      default: {
        value: {
          name: 'Обновленный магазин',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the store',
          nullable: true,
        },
        city: {
          type: 'string',
          description: 'City of the store',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Store updated successfully',
    type: Store,
  })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() store: UpdateStoreDto,
    @Request() req: ExpressRequest,
  ): Promise<Store> {
    return this.storesService.update(+id, store, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @SetMetadata('entityType', 'store')
  @ApiOperation({ summary: 'Delete store by ID (owner only)' })
  @ApiResponse({ status: 204, description: 'Store deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner)' })
  @ApiBearerAuth()
  remove(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    return this.storesService.remove(+id, req.user.id);
  }
}
