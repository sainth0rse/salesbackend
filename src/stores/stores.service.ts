import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storesRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async create(store: Partial<Store>): Promise<Store> {
    const newStore = this.storesRepository.create(store);
    return this.storesRepository.save(newStore);
  }

  async update(id: number, store: Partial<Store>): Promise<Store> {
    await this.storesRepository.update(id, store);
    return this.findOne(id); // Повторно вызываем findOne, чтобы вернуть обновленный объект
  }

  async remove(id: number): Promise<void> {
    await this.storesRepository.delete(id);
  }
}
