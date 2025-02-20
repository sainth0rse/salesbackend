import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
export declare class StoresService {
    private storesRepository;
    constructor(storesRepository: Repository<Store>);
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    create(store: Partial<Store>): Promise<Store>;
    update(id: number, store: Partial<Store>): Promise<Store>;
    remove(id: number): Promise<void>;
}
