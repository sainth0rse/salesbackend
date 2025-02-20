import { Repository } from 'typeorm';
import { ProductCustomField } from './entities/product-custom-field.entity';
export declare class ProductCustomFieldsService {
    private customFieldsRepository;
    constructor(customFieldsRepository: Repository<ProductCustomField>);
    findAll(productId: number): Promise<ProductCustomField[]>;
    findOne(id: number): Promise<ProductCustomField>;
    create(customField: Partial<ProductCustomField>): Promise<ProductCustomField>;
    update(id: number, customField: Partial<ProductCustomField>): Promise<ProductCustomField>;
    remove(id: number): Promise<void>;
}
