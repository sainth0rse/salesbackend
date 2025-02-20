import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomField } from './entities/product-custom-field.entity';
export declare class ProductCustomFieldsController {
    private readonly customFieldsService;
    constructor(customFieldsService: ProductCustomFieldsService);
    findAll(productId: string): Promise<ProductCustomField[]>;
    findOne(id: string): Promise<ProductCustomField>;
    create(customField: Partial<ProductCustomField>, req: Request): Promise<ProductCustomField>;
    update(id: string, customField: Partial<ProductCustomField>, req: Request): Promise<ProductCustomField>;
    remove(id: string, req: Request): Promise<void>;
}
