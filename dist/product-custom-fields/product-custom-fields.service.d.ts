import { Repository } from 'typeorm';
import { ProductCustomField } from './entities/product-custom-field.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
export declare class ProductCustomFieldsService {
    private customFieldsRepository;
    private usersRepository;
    private productsRepository;
    constructor(customFieldsRepository: Repository<ProductCustomField>, usersRepository: Repository<User>, productsRepository: Repository<Product>);
    findAll(productId: number): Promise<ProductCustomField[]>;
    findOne(id: number): Promise<ProductCustomField>;
    create(customFieldData: Partial<ProductCustomField>, userId: number): Promise<ProductCustomField>;
    update(id: number, customFieldData: Partial<ProductCustomField>, userId: number): Promise<ProductCustomField>;
    remove(id: number, userId: number): Promise<void>;
}
