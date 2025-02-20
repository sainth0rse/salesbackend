"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const store_product_entity_1 = require("./entities/store-product.entity");
const store_products_service_1 = require("./store-products.service");
const store_products_controller_1 = require("./store-products.controller");
const user_entity_1 = require("../users/entities/user.entity");
const products_module_1 = require("../products/products.module");
const stores_module_1 = require("../stores/stores.module");
const product_entity_1 = require("../products/entities/product.entity");
const store_entity_1 = require("../stores/entities/store.entity");
let StoreProductsModule = class StoreProductsModule {
};
exports.StoreProductsModule = StoreProductsModule;
exports.StoreProductsModule = StoreProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([store_product_entity_1.StoreProduct, user_entity_1.User, product_entity_1.Product, store_entity_1.Store]),
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
            (0, common_1.forwardRef)(() => stores_module_1.StoresModule),
        ],
        providers: [store_products_service_1.StoreProductsService],
        controllers: [store_products_controller_1.StoreProductsController],
        exports: [store_products_service_1.StoreProductsService],
    })
], StoreProductsModule);
//# sourceMappingURL=store-products.module.js.map