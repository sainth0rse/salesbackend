import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(currentUserId: number): Promise<User[]>;
    findOne(id: number, currentUserId: number): Promise<User>;
    create(user: Partial<User>, currentUserId: number): Promise<User>;
    update(id: number, user: Partial<User>, currentUserId: number): Promise<User>;
    remove(id: number, currentUserId: number): Promise<void>;
}
