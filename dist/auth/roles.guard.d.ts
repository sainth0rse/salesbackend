import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
declare const RolesGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RolesGuard extends RolesGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
export {};
