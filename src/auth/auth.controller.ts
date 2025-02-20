import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      role?: string;
    },
  ) {
    this.logger.log(`Register attempt for email: ${body.email}`);
    try {
      const user = await this.authService.register(
        body.email,
        body.password,
        body.role,
      );
      this.logger.log(`Returning registered user: ${JSON.stringify(user)}`);
      return user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Registration failed for ${body.email}: ${errorMessage}`,
      );
      throw error instanceof Error ? error : new Error('Registration failed');
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    this.logger.log(`Login attempt for email: ${body.email}`);
    try {
      const result = await this.authService.login(body.email, body.password);
      this.logger.log(`Returning login token: ${JSON.stringify(result)}`);
      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Login failed for ${body.email}: ${errorMessage}`);
      throw error instanceof Error ? error : new Error('Login failed');
    }
  }
}
