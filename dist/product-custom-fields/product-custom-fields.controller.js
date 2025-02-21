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
exports.ProductCustomFieldsController = void 0;
const common_1 = require("@nestjs/common");
const product_custom_fields_service_1 = require("./product-custom-fields.service");
const product_custom_field_entity_1 = require("./entities/product-custom-field.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductCustomFieldDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductCustomFieldDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductCustomFieldDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductCustomFieldDto.prototype, "value", void 0);
class UpdateProductCustomFieldDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductCustomFieldDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductCustomFieldDto.prototype, "key", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductCustomFieldDto.prototype, "value", void 0);
let ProductCustomFieldsController = class ProductCustomFieldsController {
    constructor(customFieldsService) {
        this.customFieldsService = customFieldsService;
    }
    findAll(productId) {
        return this.customFieldsService.findAll(+productId);
    }
    findOne(id) {
        return this.customFieldsService.findOne(+id);
    }
    create(customField, req) {
        return this.customFieldsService.create(customField, req.user.id);
    }
    update(id, customField, req) {
        return this.customFieldsService.update(+id, customField, req.user.id);
    }
    remove(id, req) {
        return this.customFieldsService.remove(+id, req.user.id);
    }
};
exports.ProductCustomFieldsController = ProductCustomFieldsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all custom fields for a product (admin) or user’s fields (client)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'productId',
        required: true,
        type: Number,
        description: 'Product ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return list of custom fields for the product',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get custom field by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return custom field details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Custom field not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new custom field for a product' }),
    (0, swagger_1.ApiBody)({
        type: CreateProductCustomFieldDto,
        description: 'Custom field creation data',
        examples: {
            default: {
                value: {
                    productId: 12,
                    key: 'color',
                    value: 'red',
                },
            },
        },
        schema: {
            type: 'object',
            properties: {
                productId: { type: 'number', description: 'ID of the product' },
                key: { type: 'string', description: 'Key of the custom field' },
                value: { type: 'string', description: 'Value of the custom field' },
            },
            required: ['productId', 'key', 'value'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Custom field created successfully',
        type: product_custom_field_entity_1.ProductCustomField,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductCustomFieldDto, Object]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update custom field by ID (owner only)' }),
    (0, swagger_1.ApiBody)({
        type: UpdateProductCustomFieldDto,
        description: 'Custom field update data',
        examples: {
            default: {
                value: {
                    value: 'blue',
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
                key: {
                    type: 'string',
                    description: 'Key of the custom field',
                    nullable: true,
                },
                value: {
                    type: 'string',
                    description: 'Value of the custom field',
                    nullable: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Custom field updated successfully',
        type: product_custom_field_entity_1.ProductCustomField,
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden (not owner)' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProductCustomFieldDto, Object]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete custom field by ID (owner only)' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Custom field deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden (not owner)' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "remove", null);
exports.ProductCustomFieldsController = ProductCustomFieldsController = __decorate([
    (0, swagger_1.ApiTags)('product-custom-fields'),
    (0, common_1.Controller)('product-custom-fields'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [product_custom_fields_service_1.ProductCustomFieldsService])
], ProductCustomFieldsController);
//# sourceMappingURL=product-custom-fields.controller.js.map