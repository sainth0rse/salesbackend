import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    private readonly logger;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    register(email: string, password: string, role?: string): Promise<User>;
}
