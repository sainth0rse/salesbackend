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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository, usersRepository) {
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
    }
    async findAll(userId, role) {
        if (role === 'admin') {
            return this.productsRepository.find({ relations: ['createdBy'] });
        }
        return this.productsRepository.find({
            where: { createdBy: { id: userId } },
            relations: ['createdBy'],
        });
    }
    async findOne(id) {
        return this.productsRepository.findOneOrFail({
            where: { id },
            relations: ['createdBy'],
        });
    }
    async create(productData, userId) {
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        const product = this.productsRepository.create({
            ...productData,
            createdBy: user,
        });
        return this.productsRepository.save(product);
    }
    async update(id, productData, userId) {
        const product = await this.findOne(id);
        if (product.createdBy?.id !== userId) {
            throw new common_1.ForbiddenException('You are not the owner of this product');
        }
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        Object.assign(product, productData, { createdBy: user });
        return this.productsRepository.save(product);
    }
    async remove(id, userId) {
        const product = await this.findOne(id);
        if (!product.createdBy) {
            throw new common_1.ForbiddenException('Product has no owner — cannot delete');
        }
        if (product.createdBy.id !== userId) {
            throw new common_1.ForbiddenException('You are not the owner of this product');
        }
        await this.productsRepository.delete(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map