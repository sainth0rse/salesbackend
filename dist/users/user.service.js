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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const product_custom_field_entity_1 = require("../product-custom-fields/entities/product-custom-field.entity");
const product_entity_1 = require("../products/entities/product.entity");
const store_entity_1 = require("../stores/entities/store.entity");
const store_product_entity_1 = require("../store-products/entities/store-product.entity");
let UsersService = class UsersService {
    constructor(usersRepository, customFieldsRepository, productsRepository, storesRepository, storeProductsRepository) {
        this.usersRepository = usersRepository;
        this.customFieldsRepository = customFieldsRepository;
        this.productsRepository = productsRepository;
        this.storesRepository = storesRepository;
        this.storeProductsRepository = storeProductsRepository;
    }
    async findAll(currentUserId) {
        const user = await this.usersRepository.findOneOrFail({
            where: { id: currentUserId },
        });
        if (user.role === 'admin') {
            return this.usersRepository.find();
        }
        return this.usersRepository.find({ where: { id: currentUserId } });
    }
    async findOne(id, currentUserId) {
        const user = await this.usersRepository.findOneOrFail({ where: { id } });
        const currentUser = await this.usersRepository.findOneOrFail({
            where: { id: currentUserId },
        });
        if (currentUser.role !== 'admin' && currentUser.id !== id) {
            throw new common_1.UnauthorizedException('You can only view your own profile');
        }
        return user;
    }
    async create(user, currentUserId) {
        const currentUser = await this.usersRepository.findOneOrFail({
            where: { id: currentUserId },
        });
        if (currentUser.role !== 'admin') {
            throw new common_1.UnauthorizedException('Only admin can create users');
        }
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }
    async update(id, user, currentUserId) {
        const existingUser = await this.findOne(id, currentUserId);
        const currentUser = await this.usersRepository.findOneOrFail({
            where: { id: currentUserId },
        });
        if (currentUser.role !== 'admin' && currentUser.id !== id) {
            throw new common_1.UnauthorizedException('You can only update your own profile');
        }
        Object.assign(existingUser, user);
        return this.usersRepository.save(existingUser);
    }
    async remove(id, currentUserId) {
        const userToDelete = await this.findOne(id, currentUserId);
        const currentUser = await this.usersRepository.findOneOrFail({
            where: { id: currentUserId },
        });
        if (currentUser.role !== 'admin') {
            throw new common_1.UnauthorizedException('Only admin can delete users');
        }
        await this.customFieldsRepository.delete({ createdBy: { id } });
        await this.productsRepository.delete({ createdBy: { id } });
        await this.storesRepository.delete({ createdBy: { id } });
        await this.storeProductsRepository.delete({ createdBy: { id } });
        console.log(`Deleting user with ID ${userToDelete.id}`);
        await this.usersRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_custom_field_entity_1.ProductCustomField)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(4, (0, typeorm_1.InjectRepository)(store_product_entity_1.StoreProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=user.service.js.map