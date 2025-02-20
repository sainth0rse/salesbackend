import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
export declare class ProductCustomField {
    id: number;
    product: Product;
    productId: number;
    key: string;
    value: string;
    createdBy: User | null;
}
