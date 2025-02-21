import { AuthService } from './auth.service';
declare class RegisterDto {
    email: string;
    password: string;
    role?: 'admin' | 'client';
}
declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("../users/entities/user.entity").User>;
    login(body: LoginDto): Promise<{
        accessToken: string;
    }>;
}
export {};
