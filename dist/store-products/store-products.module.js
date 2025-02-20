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
let StoreProductsModule = class StoreProductsModule {
};
exports.StoreProductsModule = StoreProductsModule;
exports.StoreProductsModule = StoreProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([store_product_entity_1.StoreProduct])],
        providers: [store_products_service_1.StoreProductsService],
        controllers: [store_products_controller_1.StoreProductsController],
        exports: [store_products_service_1.StoreProductsService],
    })
], StoreProductsModule);
//# sourceMappingURL=store-products.module.js.map