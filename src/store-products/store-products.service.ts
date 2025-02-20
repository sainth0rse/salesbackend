import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProduct } from './entities/store-product.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';

@Injectable()
export class StoreProductsService {
  constructor(
    @InjectRepository(StoreProduct)
    private storeProductsRepository: Repository<StoreProduct>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async findAll(): Promise<StoreProduct[]> {
    return this.storeProductsRepository.find({
      relations: ['product', 'store', 'createdBy'],
    });
  }

  async findOne(id: number): Promise<StoreProduct> {
    const storeProduct = await this.storeProductsRepository.findOne({
      where: { id },
      relations: ['product', 'store', 'createdBy'],
    });
    if (!storeProduct) {
      throw new NotFoundException(`StoreProduct with ID ${id} not found`);
    }
    return storeProduct;
  }

  async create(
    storeProductData: Partial<StoreProduct>,
    userId: number,
  ): Promise<StoreProduct> {
    const { productId, storeId, stock } = storeProductData;

    // Проверяем, существует ли продукт
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Проверяем, существует ли склад
    const store = await this.storesRepository.findOneBy({ id: storeId });
    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    // Получаем пользователя
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });

    // Создаём запись StoreProduct
    const storeProduct = this.storeProductsRepository.create({
      productId,
      storeId,
      stock,
      createdBy: user,
    });
    return this.storeProductsRepository.save(storeProduct);
  }

  async update(
    id: number,
    storeProductData: Partial<StoreProduct>,
    userId: number,
  ): Promise<StoreProduct> {
    const existingStoreProduct = await this.findOne(id);
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });

    // Обновляем поля
    Object.assign(existingStoreProduct, storeProductData, { createdBy: user });
    await this.storeProductsRepository.update(id, existingStoreProduct);

    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const storeProduct = await this.findOne(id);

    // Если нужно проверять владельца:
    if (!storeProduct.createdBy) {
      throw new ForbiddenException(
        'Store product has no owner — cannot delete',
      );
    }
    if (storeProduct.createdBy.id !== userId) {
      throw new ForbiddenException(
        'You are not the owner of this store product',
      );
    }

    await this.storeProductsRepository.delete(id);
  }
}
