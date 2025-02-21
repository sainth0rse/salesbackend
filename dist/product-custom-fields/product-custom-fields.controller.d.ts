import { ProductCustomFieldsService } from './product-custom-fields.service';
import { ProductCustomField } from './entities/product-custom-field.entity';
declare class CreateProductCustomFieldDto {
    productId: number;
    key: string;
    value: string;
}
declare class UpdateProductCustomFieldDto {
    productId?: number;
    key?: string;
    value?: string;
}
interface ExpressRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class ProductCustomFieldsController {
    private readonly customFieldsService;
    constructor(customFieldsService: ProductCustomFieldsService);
    findAll(productId: string): Promise<ProductCustomField[]>;
    findOne(id: string): Promise<ProductCustomField>;
    create(customField: CreateProductCustomFieldDto, req: ExpressRequest): Promise<ProductCustomField>;
    update(id: string, customField: UpdateProductCustomFieldDto, req: ExpressRequest): Promise<ProductCustomField>;
    remove(id: string, req: ExpressRequest): Promise<void>;
}
export {};
