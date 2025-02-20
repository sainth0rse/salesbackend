"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const product_custom_field_entity_1 = require("../product-custom-fields/entities/product-custom-field.entity");
const product_entity_1 = require("../products/entities/product.entity");
const store_entity_1 = require("../stores/entities/store.entity");
const store_product_entity_1 = require("../store-products/entities/store-product.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                product_custom_field_entity_1.ProductCustomField,
                product_entity_1.Product,
                store_entity_1.Store,
                store_product_entity_1.StoreProduct,
            ]),
        ],
        providers: [user_service_1.UsersService],
        controllers: [user_controller_1.UsersController],
        exports: [user_service_1.UsersService, typeorm_1.TypeOrmModule],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map