import { ProductCustomField } from '../../product-custom-fields/entities/product-custom-field.entity';
import { StoreProduct } from '../../store-products/entities/store-product.entity';
import { User } from '../../users/entities/user.entity';
export declare class Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    productCustomFields: ProductCustomField[];
    storeProducts: StoreProduct[];
    createdBy: User | null;
}
