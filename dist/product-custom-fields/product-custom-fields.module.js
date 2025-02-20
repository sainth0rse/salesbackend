"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCustomFieldsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_custom_field_entity_1 = require("./entities/product-custom-field.entity");
const product_custom_fields_service_1 = require("./product-custom-fields.service");
const product_custom_fields_controller_1 = require("./product-custom-fields.controller");
const users_module_1 = require("../users/users.module");
const product_entity_1 = require("../products/entities/product.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ProductCustomFieldsModule = class ProductCustomFieldsModule {
};
exports.ProductCustomFieldsModule = ProductCustomFieldsModule;
exports.ProductCustomFieldsModule = ProductCustomFieldsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_custom_field_entity_1.ProductCustomField, product_entity_1.Product, user_entity_1.User]),
            users_module_1.UsersModule,
        ],
        providers: [product_custom_fields_service_1.ProductCustomFieldsService],
        controllers: [product_custom_fields_controller_1.ProductCustomFieldsController],
        exports: [product_custom_fields_service_1.ProductCustomFieldsService],
    })
], ProductCustomFieldsModule);
//# sourceMappingURL=product-custom-fields.module.js.map