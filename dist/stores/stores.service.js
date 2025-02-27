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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("./entities/store.entity");
const user_entity_1 = require("../users/entities/user.entity");
let StoresService = class StoresService {
    constructor(storesRepository, usersRepository) {
        this.storesRepository = storesRepository;
        this.usersRepository = usersRepository;
    }
    async findAll(userId, role) {
        if (role === 'admin') {
            return this.storesRepository.find({ relations: ['createdBy'] });
        }
        return this.storesRepository.find({
            where: { createdBy: { id: userId } },
            relations: ['createdBy'],
        });
    }
    async findOne(id) {
        return this.storesRepository.findOneOrFail({
            where: { id },
            relations: ['createdBy'],
        });
    }
    async create(storeData, userId) {
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        const store = this.storesRepository.create({
            ...storeData,
            createdBy: user,
        });
        return this.storesRepository.save(store);
    }
    async update(id, storeData, userId) {
        const store = await this.findOne(id);
        if (store.createdBy?.id !== userId) {
            throw new common_1.ForbiddenException('You are not the owner of this store');
        }
        const user = await this.usersRepository.findOneOrFail({
            where: { id: userId },
        });
        Object.assign(store, storeData, { createdBy: user });
        return this.storesRepository.save(store);
    }
    async remove(id, userId) {
        const store = await this.findOne(id);
        if (!store.createdBy) {
            throw new common_1.ForbiddenException('Store has no owner — cannot delete');
        }
        if (store.createdBy.id !== userId) {
            throw new common_1.ForbiddenException('You are not the owner of this store');
        }
        await this.storesRepository.delete(id);
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StoresService);
//# sourceMappingURL=stores.service.js.map