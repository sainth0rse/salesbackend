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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const roles_decorator_1 = require("./auth/roles.decorator");
const roles_guard_1 = require("./auth/roles.guard");
let AppController = class AppController {
    constructor(appService, dataSource) {
        this.appService = appService;
        this.dataSource = dataSource;
    }
    getHello() {
        return this.appService.getHello();
    }
    async testDatabase() {
        try {
            await this.dataSource.query('SELECT 1');
            return 'Database connection successful!';
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return `Database connection failed: ${message}`;
        }
    }
    getAdminOnly() {
        return 'This endpoint is accessible only by admin!';
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('db-test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testDatabase", null);
__decorate([
    (0, common_1.Get)('admin-only'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getAdminOnly", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [app_service_1.AppService,
        typeorm_2.DataSource])
], AppController);
//# sourceMappingURL=app.controller.js.map