import { StoreProductsService } from './store-products.service';
import { StoreProduct } from './entities/store-product.entity';
declare class CreateStoreProductDto {
    productId: number;
    storeId: number;
    stock?: number;
}
declare class UpdateStoreProductDto {
    productId?: number;
    storeId?: number;
    stock?: number;
}
interface ExpressRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class StoreProductsController {
    private readonly storeProductsService;
    constructor(storeProductsService: StoreProductsService);
    findAll(req: ExpressRequest): Promise<StoreProduct[]>;
    findOne(id: string): Promise<StoreProduct>;
    create(storeProduct: CreateStoreProductDto, req: ExpressRequest): Promise<StoreProduct>;
    update(id: string, storeProduct: UpdateStoreProductDto, req: ExpressRequest): Promise<StoreProduct>;
    remove(id: string, req: ExpressRequest): Promise<void>;
}
export {};
