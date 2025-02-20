"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const config_1 = require("@nestjs/config");
const users_module_1 = require("../users/users.module");
const roles_guard_1 = require("./roles.guard");
const ownership_guard_1 = require("./ownership.guard");
const products_module_1 = require("../products/products.module");
const stores_module_1 = require("../stores/stores.module");
const store_products_module_1 = require("../store-products/store-products.module");
const product_custom_fields_module_1 = require("../product-custom-fields/product-custom-fields.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET') || 'default-secret-key',
                    signOptions: { expiresIn: '1h' },
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule,
            products_module_1.ProductsModule,
            stores_module_1.StoresModule,
            store_products_module_1.StoreProductsModule,
            product_custom_fields_module_1.ProductCustomFieldsModule,
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, roles_guard_1.RolesGuard, ownership_guard_1.OwnershipGuard],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map