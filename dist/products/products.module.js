"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const users_module_1 = require("../users/users.module");
const ownership_module_1 = require("../ownership/ownership.module");
const stores_module_1 = require("../stores/stores.module");
const store_products_module_1 = require("../store-products/store-products.module");
const product_custom_fields_module_1 = require("../product-custom-fields/product-custom-fields.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
            users_module_1.UsersModule,
            (0, common_1.forwardRef)(() => ownership_module_1.OwnershipModule),
            (0, common_1.forwardRef)(() => stores_module_1.StoresModule),
            (0, common_1.forwardRef)(() => store_products_module_1.StoreProductsModule),
            (0, common_1.forwardRef)(() => product_custom_fields_module_1.ProductCustomFieldsModule),
        ],
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map