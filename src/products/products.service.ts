import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['createdBy'] });
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneOrFail({
      where: { id },
      relations: ['createdBy'],
    });
  }

  async create(
    productData: Partial<Product>,
    userId: number,
  ): Promise<Product> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
    const product = this.productsRepository.create({
      ...productData,
      createdBy: user,
    });
    return this.productsRepository.save(product);
  }

  async update(
    id: number,
    productData: Partial<Product>,
    userId: number,
  ): Promise<Product> {
    const product = await this.findOne(id);
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
    Object.assign(product, productData, { createdBy: user });
    return this.productsRepository.save(product);
  }

  async remove(id: number, userId: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.delete(id);
  }
}
