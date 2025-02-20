import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { StoreProductsModule } from './store-products/store-products.module';
import { ProductCustomFieldsModule } from './product-custom-fields/product-custom-fields.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'salesstep_db',
      autoLoadEntities: true,
      synchronize: true, // Отключить в продакшене
    }),
    ProductsModule,
    StoresModule,
    StoreProductsModule,
    ProductCustomFieldsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
