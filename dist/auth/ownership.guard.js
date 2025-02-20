"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const products_service_1 = require("../products/products.service");
const stores_service_1 = require("../stores/stores.service");
const store_products_service_1 = require("../store-products/store-products.service");
const product_custom_fields_service_1 = require("../product-custom-fields/product-custom-fields.service");
let OwnershipGuard = class OwnershipGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, productsService, storesService, storeProductsService, productCustomFieldsService) {
        super();
        this.reflector = reflector;
        this.productsService = productsService;
        this.storesService = storesService;
        this.storeProductsService = storeProductsService;
        this.productCustomFieldsService = productCustomFieldsService;
    }
    canActivate(context) {
        const activate = super.canActivate(context);
        if (!activate) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        const entityId = request.params.id;
        if (!entityId) {
            return false;
        }
        const entityType = this.reflector.get('entityType', context.getHandler());
        if (!entityType) {
            return false;
        }
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
};
exports.OwnershipGuard = OwnershipGuard;
exports.OwnershipGuard = OwnershipGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        products_service_1.ProductsService,
        stores_service_1.StoresService,
        store_products_service_1.StoreProductsService,
        product_custom_fields_service_1.ProductCustomFieldsService])
], OwnershipGuard);
//# sourceMappingURL=ownership.guard.js.map