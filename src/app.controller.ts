import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-test')
  async testDatabase(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1');
      return 'Database connection successful!';
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return `Database connection failed: ${message}`;
    }
  }

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard) // Проверяем JWT и роль
  @Roles('admin') // Ограничиваем доступ только для роли 'admin'
  getAdminOnly(): string {
    return 'This endpoint is accessible only by admin!';
  }
}
