import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { User } from '../users/entities/user.entity';
export declare class StoresService {
    private storesRepository;
    private usersRepository;
    constructor(storesRepository: Repository<Store>, usersRepository: Repository<User>);
    findAll(userId: number, role: string): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    create(storeData: Partial<Store>, userId: number): Promise<Store>;
    update(id: number, storeData: Partial<Store>, userId: number): Promise<Store>;
    remove(id: number, userId: number): Promise<void>;
}
