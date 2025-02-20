import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';
import { StoreProductsService } from '../store-products/store-products.service';
import { ProductCustomFieldsService } from '../product-custom-fields/product-custom-fields.service';

// Описываем структуру user
interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

// Возможные entityType
type EntityType =
  | 'product'
  | 'store'
  | 'store_product'
  | 'product_custom_field';

/**
 * Расширяем Request из express:
 * - user?: JwtPayload (чтобы не было any при доступе к .user)
 * - params: { id: string } (чтобы не было any при доступе к .params.id)
 */
interface ExpressRequest extends Request {
  user?: JwtPayload;
  params: {
    id: string;
  };
}

@Injectable()
export class OwnershipGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private productsService: ProductsService,
    private storesService: StoresService,
    private storeProductsService: StoreProductsService,
    private productCustomFieldsService: ProductCustomFieldsService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Сначала даём сработать JWT-Guard’у
    const activate = super.canActivate(context) as boolean | Promise<boolean>;
    if (!activate) {
      return false;
    }

    // Типизируем request, чтобы не было any
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const user = request.user;
    if (!user) {
      return false;
    }

    const entityId = request.params.id;
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
