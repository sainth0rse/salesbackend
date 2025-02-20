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
exports.ProductCustomFieldsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_custom_field_entity_1 = require("./entities/product-custom-field.entity");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
let ProductCustomFieldsService = class ProductCustomFieldsService {
    constructor(customFieldsRepository, usersRepository, productsRepository) {
        this.customFieldsRepository = customFieldsRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
    }
    async findAll(productId) {
        return this.customFieldsRepository.find({ where: { productId } });
    }
    async findOne(id) {
        const customField = await this.customFieldsRepository.findOneBy({ id });
        if (!customField) {
            throw new common_1.NotFoundException(`Custom field with ID ${id} not found`);
        }
        return customField;
    }
    async create(customFieldData, userId) {
        const { productId, key, value } = customFieldData;
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        const customField = this.customFieldsRepository.create({
            productId,
            key,
            value,
            createdBy: user,
        });
        return this.customFieldsRepository.save(customField);
    }
    async update(id, customFieldData, userId) {
        const existingCustomField = await this.findOne(id);
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        Object.assign(existingCustomField, customFieldData, { createdBy: user });
        await this.customFieldsRepository.update(id, existingCustomField);
        return this.findOne(id);
    }
    async remove(id, userId) {
        const customField = await this.findOne(id);
        if (!customField.createdBy) {
            throw new common_1.ForbiddenException('Custom field has no owner — cannot delete');
        }
        if (customField.createdBy.id !== userId) {
            throw new common_1.ForbiddenException('You are not the owner of this custom field');
        }
        await this.customFieldsRepository.delete(id);
    }
};
exports.ProductCustomFieldsService = ProductCustomFieldsService;
exports.ProductCustomFieldsService = ProductCustomFieldsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_custom_field_entity_1.ProductCustomField)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductCustomFieldsService);
//# sourceMappingURL=product-custom-fields.service.js.map