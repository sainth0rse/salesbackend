import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        role?: string;
    }): Promise<import("../users/entities/user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
}
