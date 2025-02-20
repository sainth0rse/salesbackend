import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.usersRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    this.logger.log(`Login attempt for: ${email}`);
    try {
      const user = await this.validateUser(email, password);
      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);
      this.logger.log(`User logged in successfully: ${email}`);
      return { accessToken: `Bearer ${token}` };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Login failed for ${email}: ${errorMessage}`);
      throw error instanceof Error ? error : new Error('Login failed');
    }
  }

  async register(
    email: string,
    password: string,
    role: string = 'client',
  ): Promise<User> {
    this.logger.log(`Register attempt for: ${email}`);
    try {
      // Логируем перед bcrypt
      this.logger.log(`Before bcrypt.hash: ${email}`);
      const hashedPassword = await bcrypt.hash(password, 5); // Установлено 5 для скорости (можно увеличить до 10)
      this.logger.log(`After bcrypt.hash: ${email}`);

      // Создаём объект User
      const user = this.usersRepository.create({
        email,
        password: hashedPassword,
        role,
      });

      // Логируем перед сохранением
      this.logger.log(`Before save user: ${email}`);
      const savedUser = await this.usersRepository.save(user);
      this.logger.log(`After save user: ${email}`);

      this.logger.log(`User registered successfully: ${email}`);
      return savedUser;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Registration failed for ${email}: ${errorMessage}`);
      throw error instanceof Error ? error : new Error('Registration failed');
    }
  }
}
