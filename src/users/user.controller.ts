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

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Request() req): Promise<User[]> {
    const user = req.user as { id: number };
    return await this.usersService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<User> {
    const user = req.user as { id: number };
    return await this.usersService.findOne(+id, user.id);
  }

  @Post()
  async create(@Body() user: Partial<User>, @Request() req): Promise<User> {
    const userCreating = req.user as { id: number };
    return await this.usersService.create(user, userCreating.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: Partial<User>,
    @Request() req,
  ): Promise<User> {
    const userUpdating = req.user as { id: number };
    return await this.usersService.update(+id, user, userUpdating.id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin') // Только админ может удалять пользователей
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const userDeleting = req.user as { id: number };
    await this.usersService.remove(+id, userDeleting.id);
  }
}
