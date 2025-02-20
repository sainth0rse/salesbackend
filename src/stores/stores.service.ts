import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Store[]> {
    return this.storesRepository.find({ relations: ['createdBy'] });
  }

  async findOne(id: number): Promise<Store> {
    return this.storesRepository.findOneOrFail({
      where: { id },
      relations: ['createdBy'],
    });
  }

  async create(storeData: Partial<Store>, userId: number): Promise<Store> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
    const store = this.storesRepository.create({
      ...storeData,
      createdBy: user,
    });
    return this.storesRepository.save(store);
  }

  async update(
    id: number,
    storeData: Partial<Store>,
    userId: number,
  ): Promise<Store> {
    const store = await this.findOne(id);
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
    Object.assign(store, storeData, { createdBy: user });
    return this.storesRepository.save(store);
  }

  async remove(id: number, userId: number): Promise<void> {
    const store = await this.findOne(id);

    // Если нужно проверять владельца:
    if (!store.createdBy) {
      throw new ForbiddenException('Store has no owner — cannot delete');
    }
    if (store.createdBy.id !== userId) {
      throw new ForbiddenException('You are not the owner of this store');
    }

    await this.storesRepository.delete(id);
  }
}
