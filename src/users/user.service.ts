import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(currentUserId: number): Promise<User[]> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: currentUserId },
    });
    if (user.role === 'admin') {
      return this.usersRepository.find();
    }
    return this.usersRepository.find({ where: { id: currentUserId } });
  }

  async findOne(id: number, currentUserId: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    const currentUser = await this.usersRepository.findOneOrFail({
      where: { id: currentUserId },
    });
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new UnauthorizedException('You can only view your own profile');
    }
    return user;
  }

  async create(user: Partial<User>, currentUserId: number): Promise<User> {
    const currentUser = await this.usersRepository.findOneOrFail({
      where: { id: currentUserId },
    });
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedException('Only admin can create users');
    }
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(
    id: number,
    user: Partial<User>,
    currentUserId: number,
  ): Promise<User> {
    const existingUser = await this.findOne(id, currentUserId);
    const currentUser = await this.usersRepository.findOneOrFail({
      where: { id: currentUserId },
    });
    if (currentUser.role !== 'admin' && currentUser.id !== id) {
      throw new UnauthorizedException('You can only update your own profile');
    }
    Object.assign(existingUser, user);
    return this.usersRepository.save(existingUser);
  }

  async remove(id: number, currentUserId: number): Promise<void> {
    const userToDelete = await this.findOne(id, currentUserId); // Используем для проверки
    const currentUser = await this.usersRepository.findOneOrFail({
      where: { id: currentUserId },
    });
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedException('Only admin can delete users');
    }
    await this.usersRepository.delete(id);
  }
}
