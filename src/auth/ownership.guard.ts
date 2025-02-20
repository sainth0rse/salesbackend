import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; // Восстанавливаем для типизации
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';
import { StoreProductsService } from '../store-products/store-products.service';
import { ProductCustomFieldsService } from '../product-custom-fields/product-custom-fields.service';

// Определяем интерфейс для пользователя
interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

// Определяем типы сущностей
type EntityType =
  | 'product'
  | 'store'
  | 'store_product'
  | 'product_custom_field';

@Injectable()
export class OwnershipGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private productsService: ProductsService,
    private storesService: StoresService,
    private storeProductsService: StoreProductsService,
    private productCustomFieldsService: ProductCustomFieldsService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const activate = super.canActivate(context) as boolean | Promise<boolean>;
    if (!activate) {
      return false;
    }

    const request = context.switchToHttp().getRequest(); // Явно типизируем как Request
    const user = request.user as JwtPayload | undefined;

    if (!user) {
      return false;
    }

    const entityId = request.params.id; // Явно типизируем как string
    if (!entityId) {
      return false;
    }

    const entityType = this.reflector.get<EntityType>(
      'entityType',
      context.getHandler(),
    );
    if (!entityType) {
      return false;
    }

    // Логика проверки владения
    switch (entityType) {
      case 'product':
        return this.productsService
          .findOne(+entityId)
          .then((p) => p.createdBy?.id === user.id || false);
      case 'store':
        return this.storesService
          .findOne(+entityId)
          .then((s) => s.createdBy?.id === user.id || false);
      case 'store_product':
        return this.storeProductsService
          .findOne(+entityId)
          .then((sp) => sp.createdBy?.id === user.id || false);
      case 'product_custom_field':
        return this.productCustomFieldsService
          .findOne(+entityId)
          .then((cf) => cf.createdBy?.id === user.id || false);
      default:
        return false;
    }
  }
}
