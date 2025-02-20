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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const store_product_entity_1 = require("../../store-products/entities/store-product.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Store = class Store {
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_product_entity_1.StoreProduct, (storeProduct) => storeProduct.store),
    __metadata("design:type", Array)
], Store.prototype, "storeProducts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    __metadata("design:type", Object)
], Store.prototype, "createdBy", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)()
], Store);
//# sourceMappingURL=store.entity.js.map