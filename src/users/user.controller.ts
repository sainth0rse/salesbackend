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
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number };
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Request() req: Request): Promise<User[]> {
    const user = (req as ExpressRequest).user;
    return await this.usersService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: Request,
  ): Promise<User> {
    const user = (req as ExpressRequest).user;
    return await this.usersService.findOne(+id, user.id);
  }

  @Post()
  async create(
    @Body() user: Partial<User>,
    @Request() req: Request,
  ): Promise<User> {
    const userCreating = (req as ExpressRequest).user;
    return await this.usersService.create(user, userCreating.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: Partial<User>,
    @Request() req: Request,
  ): Promise<User> {
    const userUpdating = (req as ExpressRequest).user;
    return await this.usersService.update(+id, user, userUpdating.id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin') // Только админ может удалять пользователей
  async remove(
    @Param('id') id: string,
    @Request() req: Request,
  ): Promise<void> {
    const userDeleting = (req as ExpressRequest).user;
    await this.usersService.remove(+id, userDeleting.id);
  }
}
