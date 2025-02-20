import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(product: Partial<Product>, req: any): Promise<Product>;
    update(id: string, product: Partial<Product>, req: any): Promise<Product>;
    remove(id: string, req: any): Promise<void>;
}
