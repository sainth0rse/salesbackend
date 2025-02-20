import { StoreProduct } from '../../store-products/entities/store-product.entity';
import { User } from '../../users/entities/user.entity';
export declare class Store {
    id: number;
    name: string;
    city: string;
    storeProducts: StoreProduct[];
    createdBy: User | null;
}
