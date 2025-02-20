import { Injectable, ForbiddenException } from '@nestjs/common';
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
    // Загружаем продукт
    const product = await this.findOne(id);

    // Если хотите проверить владельца:
    if (!product.createdBy) {
      throw new ForbiddenException('Product has no owner — cannot delete');
    }
    if (product.createdBy.id !== userId) {
      throw new ForbiddenException('You are not the owner of this product');
    }

    await this.productsRepository.delete(id);
  }
}
