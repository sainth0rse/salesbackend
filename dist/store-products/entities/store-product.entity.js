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
exports.StoreProduct = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../products/entities/product.entity");
const store_entity_1 = require("../../stores/entities/store.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let StoreProduct = class StoreProduct {
};
exports.StoreProduct = StoreProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoreProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.Product)
], StoreProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StoreProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'storeId' }),
    __metadata("design:type", store_entity_1.Store)
], StoreProduct.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StoreProduct.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StoreProduct.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy' }),
    __metadata("design:type", Object)
], StoreProduct.prototype, "createdBy", void 0);
exports.StoreProduct = StoreProduct = __decorate([
    (0, typeorm_1.Entity)()
], StoreProduct);
//# sourceMappingURL=store-product.entity.js.map