import { UsersService } from './user.service';
import { User } from './entities/user.entity';
interface ExpressRequest extends Request {
    user: {
        id: number;
        role: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: ExpressRequest): Promise<User[]>;
    findOne(id: string, req: ExpressRequest): Promise<User>;
    create(user: Partial<User>, req: ExpressRequest): Promise<User>;
    update(id: string, user: Partial<User>, req: ExpressRequest): Promise<User>;
    remove(id: string, req: ExpressRequest): Promise<void>;
}
export {};
