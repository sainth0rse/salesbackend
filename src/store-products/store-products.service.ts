import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProduct } from './entities/store-product.entity';

@Injectable()
export class StoreProductsService {
  constructor(
    @InjectRepository(StoreProduct)
    private storeProductsRepository: Repository<StoreProduct>,
  ) {}

  async findAll(): Promise<StoreProduct[]> {
    return this.storeProductsRepository.find({
      relations: ['product', 'store'],
    });
  }

  async findOne(id: number): Promise<StoreProduct> {
    const storeProduct = await this.storeProductsRepository.findOne({
      where: { id },
      relations: ['product', 'store'],
    });
    if (!storeProduct) {
      throw new NotFoundException(`StoreProduct with ID ${id} not found`);
    }
    return storeProduct;
  }

  async create(storeProduct: Partial<StoreProduct>): Promise<StoreProduct> {
    const newStoreProduct = this.storeProductsRepository.create(storeProduct);
    return this.storeProductsRepository.save(newStoreProduct);
  }

  async update(
    id: number,
    storeProduct: Partial<StoreProduct>,
  ): Promise<StoreProduct> {
    await this.storeProductsRepository.update(id, storeProduct);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.storeProductsRepository.delete(id);
  }
}
