import { Repository } from 'typeorm';
import { StoreProduct } from './entities/store-product.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';
export declare class StoreProductsService {
    private storeProductsRepository;
    private usersRepository;
    private productsRepository;
    private storesRepository;
    constructor(storeProductsRepository: Repository<StoreProduct>, usersRepository: Repository<User>, productsRepository: Repository<Product>, storesRepository: Repository<Store>);
    findAll(userId: number, role: string): Promise<StoreProduct[]>;
    findOne(id: number): Promise<StoreProduct>;
    create(storeProductData: Partial<StoreProduct>, userId: number): Promise<StoreProduct>;
    update(id: number, storeProductData: Partial<StoreProduct>, userId: number): Promise<StoreProduct>;
    remove(id: number, userId: number): Promise<void>;
}
