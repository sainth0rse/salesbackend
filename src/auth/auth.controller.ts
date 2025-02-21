import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

// DTO для регистрации
class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsEnum(['admin', 'client'])
  @IsOptional()
  role?: 'admin' | 'client';
}

// DTO для логина
class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterDto, // Используем класс как значение
    description: 'User registration data',
    examples: {
      default: {
        value: {
          email: 'user@h0rse.com',
          password: 'user123',
          role: 'client',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: Object,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Registration failed' })
  async register(@Body() body: RegisterDto) {
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
  @ApiOperation({
    summary: 'Login user with email and password to get JWT token',
  })
  @ApiBody({
    type: LoginDto, // Используем класс как значение
    description: 'User login credentials',
    examples: {
      default: {
        value: {
          email: 'user@h0rse.com',
          password: 'user123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT access token',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAaDByc2UuY29tIiwic3ViIjo4LCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzQwMTI3MjYyLCJleHAiOjE3NDAxMzA4NjJ9.L-8h1Lout5LrbWaDm1ggSfIDIgWNmEihBSPXNft_npE',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Login failed' })
  async login(@Body() body: LoginDto) {
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
