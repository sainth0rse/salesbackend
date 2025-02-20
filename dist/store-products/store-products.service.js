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
exports.StoreProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_product_entity_1 = require("./entities/store-product.entity");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
const store_entity_1 = require("../stores/entities/store.entity");
let StoreProductsService = class StoreProductsService {
    constructor(storeProductsRepository, usersRepository, productsRepository, storesRepository) {
        this.storeProductsRepository = storeProductsRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
        this.storesRepository = storesRepository;
    }
    async findAll() {
        return this.storeProductsRepository.find({
            relations: ['product', 'store', 'createdBy'],
        });
    }
    async findOne(id) {
        const storeProduct = await this.storeProductsRepository.findOne({
            where: { id },
            relations: ['product', 'store', 'createdBy'],
        });
        if (!storeProduct) {
            throw new common_1.NotFoundException(`StoreProduct with ID ${id} not found`);
        }
        return storeProduct;
    }
    async create(storeProductData, userId) {
        const { productId, storeId, stock } = storeProductData;
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const store = await this.storesRepository.findOneBy({ id: storeId });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${storeId} not found`);
        }
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        const storeProduct = this.storeProductsRepository.create({
            productId,
            storeId,
            stock,
            createdBy: user,
        });
        return this.storeProductsRepository.save(storeProduct);
    }
    async update(id, storeProductData, userId) {
        const existingStoreProduct = await this.findOne(id);
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        Object.assign(existingStoreProduct, storeProductData, { createdBy: user });
        await this.storeProductsRepository.update(id, existingStoreProduct);
        return this.findOne(id);
    }
    async remove(id, userId) {
        const storeProduct = await this.findOne(id);
        if (!storeProduct.createdBy) {
            throw new common_1.ForbiddenException('Store product has no owner — cannot delete');
        }
        if (storeProduct.createdBy.id !== userId) {
            throw new common_1.ForbiddenException('You are not the owner of this store product');
        }
        await this.storeProductsRepository.delete(id);
    }
};
exports.StoreProductsService = StoreProductsService;
exports.StoreProductsService = StoreProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_product_entity_1.StoreProduct)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StoreProductsService);
//# sourceMappingURL=store-products.service.js.map