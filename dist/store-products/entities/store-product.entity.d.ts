import { Product } from '../../products/entities/product.entity';
import { Store } from '../../stores/entities/store.entity';
import { User } from '../../users/entities/user.entity';
export declare class StoreProduct {
    id: number;
    product: Product;
    productId: number;
    store: Store;
    storeId: number;
    stock: number;
    createdBy: User | null;
}
