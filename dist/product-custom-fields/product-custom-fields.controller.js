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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
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
        const user = req.user;
        return this.customFieldsService.create(customField, user.id);
    }
    update(id, customField, req) {
        const user = req.user;
        return this.customFieldsService.update(+id, customField, user.id);
    }
    remove(id, req) {
        const user = req.user;
        return this.customFieldsService.remove(+id, user.id);
    }
};
exports.ProductCustomFieldsController = ProductCustomFieldsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductCustomFieldsController.prototype, "remove", null);
exports.ProductCustomFieldsController = ProductCustomFieldsController = __decorate([
    (0, common_1.Controller)('product-custom-fields'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [product_custom_fields_service_1.ProductCustomFieldsService])
], ProductCustomFieldsController);
//# sourceMappingURL=product-custom-fields.controller.js.map