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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const stores_service_1 = require("./stores.service");
const store_entity_1 = require("./entities/store.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ownership_guard_1 = require("../ownership/ownership.guard");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStoreDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "city", void 0);
class UpdateStoreDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "city", void 0);
let StoresController = class StoresController {
    constructor(storesService) {
        this.storesService = storesService;
    }
    findAll(req) {
        return this.storesService.findAll(req.user.id, req.user.role);
    }
    findOne(id) {
        return this.storesService.findOne(+id);
    }
    create(store, req) {
        return this.storesService.create(store, req.user.id);
    }
    update(id, store, req) {
        return this.storesService.update(+id, store, req.user.id);
    }
    remove(id, req) {
        return this.storesService.remove(+id, req.user.id);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all stores (admin) or user’s stores (client)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of stores' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get store by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return store details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new store' }),
    (0, swagger_1.ApiBody)({
        type: CreateStoreDto,
        description: 'Store creation data',
        examples: {
            default: {
                value: {
                    name: 'Новый магазин',
                    city: 'Москва',
                },
            },
        },
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Name of the store' },
                city: {
                    type: 'string',
                    description: 'City of the store',
                    nullable: true,
                },
            },
            required: ['name'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Store created successfully',
        type: store_entity_1.Store,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, common_1.SetMetadata)('entityType', 'store'),
    (0, swagger_1.ApiOperation)({ summary: 'Update store by ID (owner only)' }),
    (0, swagger_1.ApiBody)({
        type: UpdateStoreDto,
        description: 'Store update data',
        examples: {
            default: {
                value: {
                    name: 'Обновленный магазин',
                },
            },
        },
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Name of the store',
                    nullable: true,
                },
                city: {
                    type: 'string',
                    description: 'City of the store',
                    nullable: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Store updated successfully',
        type: store_entity_1.Store,
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden (not owner)' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, common_1.SetMetadata)('entityType', 'store'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete store by ID (owner only)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Store deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden (not owner)' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "remove", null);
exports.StoresController = StoresController = __decorate([
    (0, swagger_1.ApiTags)('stores'),
    (0, common_1.Controller)('stores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map