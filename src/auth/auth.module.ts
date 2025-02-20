import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from './roles.guard';
import { OwnershipGuard } from './ownership.guard';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { StoreProductsModule } from '../store-products/store-products.module';
import { ProductCustomFieldsModule } from '../product-custom-fields/product-custom-fields.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || 'default-secret-key',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    ProductsModule,
    StoresModule,
    StoreProductsModule,
    ProductCustomFieldsModule,
  ],
  providers: [AuthService, JwtStrategy, RolesGuard, OwnershipGuard],
  controllers: [AuthController],
})
export class AuthModule {}
