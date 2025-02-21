import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
interface ExpressRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(req: ExpressRequest): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(product: Partial<Product>, req: ExpressRequest): Promise<Product>;
    update(id: string, product: Partial<Product>, req: ExpressRequest): Promise<Product>;
    remove(id: string, req: ExpressRequest): Promise<void>;
}
export {};
