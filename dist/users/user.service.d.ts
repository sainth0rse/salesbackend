import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProductCustomField } from '../product-custom-fields/entities/product-custom-field.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';
import { StoreProduct } from '../store-products/entities/store-product.entity';
export declare class UsersService {
    private usersRepository;
    private customFieldsRepository;
    private productsRepository;
    private storesRepository;
    private storeProductsRepository;
    constructor(usersRepository: Repository<User>, customFieldsRepository: Repository<ProductCustomField>, productsRepository: Repository<Product>, storesRepository: Repository<Store>, storeProductsRepository: Repository<StoreProduct>);
    findAll(currentUserId: number): Promise<User[]>;
    findOne(id: number, currentUserId: number): Promise<User>;
    create(user: Partial<User>, currentUserId: number): Promise<User>;
    update(id: number, user: Partial<User>, currentUserId: number): Promise<User>;
    remove(id: number, currentUserId: number): Promise<void>;
}
