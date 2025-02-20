import { StoreProductsService } from './store-products.service';
import { StoreProduct } from './entities/store-product.entity';
export declare class StoreProductsController {
    private readonly storeProductsService;
    constructor(storeProductsService: StoreProductsService);
    findAll(): Promise<StoreProduct[]>;
    findOne(id: string): Promise<StoreProduct>;
    create(storeProduct: Partial<StoreProduct>): Promise<StoreProduct>;
    update(id: string, storeProduct: Partial<StoreProduct>): Promise<StoreProduct>;
    remove(id: string): Promise<void>;
}
