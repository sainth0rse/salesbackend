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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ownership_guard_1 = require("../ownership/ownership.guard");
let StoresController = class StoresController {
    constructor(storesService) {
        this.storesService = storesService;
    }
    findAll() {
        return this.storesService.findAll();
    }
    findOne(id) {
        return this.storesService.findOne(+id);
    }
    create(store, req) {
        const user = req.user;
        return this.storesService.create(store, user.id);
    }
    update(id, store, req) {
        const user = req.user;
        return this.storesService.update(+id, store, user.id);
    }
    remove(id, req) {
        const user = req.user;
        return this.storesService.remove(+id, user.id);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(ownership_guard_1.OwnershipGuard),
    (0, common_1.SetMetadata)('entityType', 'store'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(ownership_guard_1.OwnershipGuard),
    (0, common_1.SetMetadata)('entityType', 'store'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "remove", null);
exports.StoresController = StoresController = __decorate([
    (0, common_1.Controller)('stores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map