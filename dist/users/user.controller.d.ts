import { UsersService } from './user.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: any): Promise<User[]>;
    findOne(id: string, req: any): Promise<User>;
    create(user: Partial<User>, req: any): Promise<User>;
    update(id: string, user: Partial<User>, req: any): Promise<User>;
    remove(id: string, req: any): Promise<void>;
}
