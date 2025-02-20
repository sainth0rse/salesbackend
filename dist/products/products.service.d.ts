import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
export declare class ProductsService {
    private productsRepository;
    private usersRepository;
    constructor(productsRepository: Repository<Product>, usersRepository: Repository<User>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(productData: Partial<Product>, userId: number): Promise<Product>;
    update(id: number, productData: Partial<Product>, userId: number): Promise<Product>;
    remove(id: number, userId: number): Promise<void>;
}
