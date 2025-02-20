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
let StoreProductsService = class StoreProductsService {
    constructor(storeProductsRepository) {
        this.storeProductsRepository = storeProductsRepository;
    }
    async findAll() {
        return this.storeProductsRepository.find({
            relations: ['product', 'store'],
        });
    }
    async findOne(id) {
        const storeProduct = await this.storeProductsRepository.findOne({
            where: { id },
            relations: ['product', 'store'],
        });
        if (!storeProduct) {
            throw new common_1.NotFoundException(`StoreProduct with ID ${id} not found`);
        }
        return storeProduct;
    }
    async create(storeProduct) {
        const newStoreProduct = this.storeProductsRepository.create(storeProduct);
        return this.storeProductsRepository.save(newStoreProduct);
    }
    async update(id, storeProduct) {
        await this.storeProductsRepository.update(id, storeProduct);
        return this.findOne(id);
    }
    async remove(id) {
        await this.storeProductsRepository.delete(id);
    }
};
exports.StoreProductsService = StoreProductsService;
exports.StoreProductsService = StoreProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_product_entity_1.StoreProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoreProductsService);
//# sourceMappingURL=store-products.service.js.map