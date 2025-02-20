import { UsersService } from './user.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: Request): Promise<User[]>;
    findOne(id: string, req: Request): Promise<User>;
    create(user: Partial<User>, req: Request): Promise<User>;
    update(id: string, user: Partial<User>, req: Request): Promise<User>;
    remove(id: string, req: Request): Promise<void>;
}
