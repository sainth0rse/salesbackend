import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomField } from './entities/product-custom-field.entity';
export declare class ProductCustomFieldsController {
    private readonly customFieldsService;
    constructor(customFieldsService: ProductCustomFieldsService);
    findAll(productId: string): Promise<ProductCustomField[]>;
    findOne(id: string): Promise<ProductCustomField>;
    create(customField: Partial<ProductCustomField>): Promise<ProductCustomField>;
    update(id: string, customField: Partial<ProductCustomField>): Promise<ProductCustomField>;
    remove(id: string): Promise<void>;
}
