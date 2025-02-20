import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    findAll(): Promise<Store[]>;
    findOne(id: string): Promise<Store>;
    create(store: Partial<Store>): Promise<Store>;
    update(id: string, store: Partial<Store>): Promise<Store>;
    remove(id: string): Promise<void>;
}
