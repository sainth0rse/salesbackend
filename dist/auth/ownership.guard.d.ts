import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';
import { StoreProductsService } from '../store-products/store-products.service';
import { ProductCustomFieldsService } from '../product-custom-fields/product-custom-fields.service';
declare const OwnershipGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OwnershipGuard extends OwnershipGuard_base {
    private reflector;
    private productsService;
    private storesService;
    private storeProductsService;
    private productCustomFieldsService;
    constructor(reflector: Reflector, productsService: ProductsService, storesService: StoresService, storeProductsService: StoreProductsService, productCustomFieldsService: ProductCustomFieldsService);
    canActivate(context: ExecutionContext): false | Promise<boolean>;
}
export {};
