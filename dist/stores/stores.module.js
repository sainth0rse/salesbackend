"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const store_entity_1 = require("./entities/store.entity");
const stores_service_1 = require("./stores.service");
const stores_controller_1 = require("./stores.controller");
const users_module_1 = require("../users/users.module");
const products_module_1 = require("../products/products.module");
const store_products_module_1 = require("../store-products/store-products.module");
const product_custom_fields_module_1 = require("../product-custom-fields/product-custom-fields.module");
const ownership_module_1 = require("../ownership/ownership.module");
let StoresModule = class StoresModule {
};
exports.StoresModule = StoresModule;
exports.StoresModule = StoresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([store_entity_1.Store]),
            users_module_1.UsersModule,
            (0, common_1.forwardRef)(() => products_module_1.ProductsModule),
            (0, common_1.forwardRef)(() => store_products_module_1.StoreProductsModule),
            product_custom_fields_module_1.ProductCustomFieldsModule,
            (0, common_1.forwardRef)(() => ownership_module_1.OwnershipModule),
        ],
        providers: [stores_service_1.StoresService],
        controllers: [stores_controller_1.StoresController],
        exports: [stores_service_1.StoresService],
    })
], StoresModule);
//# sourceMappingURL=stores.module.js.map