import { Repository } from 'typeorm';
import { StoreProduct } from './entities/store-product.entity';
export declare class StoreProductsService {
    private storeProductsRepository;
    constructor(storeProductsRepository: Repository<StoreProduct>);
    findAll(): Promise<StoreProduct[]>;
    findOne(id: number): Promise<StoreProduct>;
    create(storeProduct: Partial<StoreProduct>): Promise<StoreProduct>;
    update(id: number, storeProduct: Partial<StoreProduct>): Promise<StoreProduct>;
    remove(id: number): Promise<void>;
}
