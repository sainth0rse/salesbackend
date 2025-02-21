import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
declare class CreateStoreDto {
    name: string;
    city?: string;
}
declare class UpdateStoreDto {
    name?: string;
    city?: string;
}
interface ExpressRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    findAll(req: ExpressRequest): Promise<Store[]>;
    findOne(id: string): Promise<Store>;
    create(store: CreateStoreDto, req: ExpressRequest): Promise<Store>;
    update(id: string, store: UpdateStoreDto, req: ExpressRequest): Promise<Store>;
    remove(id: string, req: ExpressRequest): Promise<void>;
}
export {};
