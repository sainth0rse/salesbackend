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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductsController = void 0;
const common_1 = require("@nestjs/common");
const store_products_service_1 = require("./store-products.service");
const store_product_entity_1 = require("./entities/store-product.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStoreProductDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStoreProductDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStoreProductDto.prototype, "storeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateStoreProductDto.prototype, "stock", void 0);
class UpdateStoreProductDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStoreProductDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStoreProductDto.prototype, "storeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStoreProductDto.prototype, "stock", void 0);
let StoreProductsController = class StoreProductsController {
    constructor(storeProductsService) {
        this.storeProductsService = storeProductsService;
    }
    findAll(req) {
        return this.storeProductsService.findAll(req.user.id, req.user.role);
    }
    findOne(id) {
        return this.storeProductsService.findOne(+id);
    }
    create(storeProduct, req) {
        return this.storeProductsService.create(storeProduct, req.user.id);
    }
    update(id, storeProduct, req) {
        return this.storeProductsService.update(+id, storeProduct, req.user.id);
    }
    remove(id, req) {
        return this.storeProductsService.remove(+id, req.user.id);
    }
};
exports.StoreProductsController = StoreProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all store-product relations (admin) or user’s relations (client)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return list of store-product relations',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get store-product relation by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return store-product relation details',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store-product relation not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new store-product relation' }),
    (0, swagger_1.ApiBody)({
        type: CreateStoreProductDto,
        description: 'Store-product relation creation data',
        examples: {
            default: {
                value: {
                    productId: 12,
                    storeId: 8,
                    stock: 100,
                },
            },
        },
        schema: {
            type: 'object',
            properties: {
                productId: { type: 'number', description: 'ID of the product' },
                storeId: { type: 'number', description: 'ID of the store' },
                stock: {
                    type: 'number',
                    description: 'Stock quantity',
                    nullable: true,
                },
            },
            required: ['productId', 'storeId'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Store-product relation created successfully',
        type: store_product_entity_1.StoreProduct,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStoreProductDto, Object]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update store-product relation by ID (owner only)' }),
    (0, swagger_1.ApiBody)({
        type: UpdateStoreProductDto,
        description: 'Store-product relation update data',
        examples: {
            default: {
                value: {
                    stock: 200,
                },
            },
        },
        schema: {
            type: 'object',
            properties: {
                productId: {
                    type: 'number',
                    description: 'ID of the product',
                    nullable: true,
                },
                storeId: {
                    type: 'number',
                    description: 'ID of the store',
                    nullable: true,
                },
                stock: {
                    type: 'number',
                    description: 'Stock quantity',
                    nullable: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Store-product relation updated successfully',
        type: store_product_entity_1.StoreProduct,
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden (not owner)' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateStoreProductDto, Object]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete store-product relation by ID (owner only)' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Store-product relation deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden (not owner)' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "remove", null);
exports.StoreProductsController = StoreProductsController = __decorate([
    (0, swagger_1.ApiTags)('store-products'),
    (0, common_1.Controller)('store-products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [store_products_service_1.StoreProductsService])
], StoreProductsController);
//# sourceMappingURL=store-products.controller.js.map