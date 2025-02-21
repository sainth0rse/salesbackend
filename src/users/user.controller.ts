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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

// Опционально: если нужно явно типизировать, добавляем интерфейс
interface ExpressRequest extends Request {
  user: { id: number; role: string };
}

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users (admin only) or current user (client)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return list of users or current user',
  })
  @ApiBearerAuth()
  async findAll(@Request() req: ExpressRequest): Promise<User[]> {
    return await this.usersService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return user details' })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner or admin)' })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ): Promise<User> {
    return await this.usersService.findOne(+id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden (not admin)' })
  @ApiBearerAuth()
  async create(
    @Body() user: Partial<User>,
    @Request() req: ExpressRequest,
  ): Promise<User> {
    return await this.usersService.create(user, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden (not owner or admin)' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() user: Partial<User>,
    @Request() req: ExpressRequest,
  ): Promise<User> {
    return await this.usersService.update(+id, user, req.user.id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden (not admin)' })
  @ApiBearerAuth()
  async remove(
    @Param('id') id: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    await this.usersService.remove(+id, req.user.id);
  }
}
