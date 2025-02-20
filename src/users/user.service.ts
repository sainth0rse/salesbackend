import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProductCustomField } from '../product-custom-fields/entities/product-custom-field.entity';
import { Product } from '../products/entities/product.entity';
import { Store } from '../stores/entities/store.entity';
import { StoreProduct } from '../store-products/entities/store-product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ProductCustomField)
    private customFieldsRepository: Repository<ProductCustomField>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(StoreProduct)
    private storeProductsRepository: Repository<StoreProduct>,
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
    const userToDelete = await this.findOne(id, currentUserId); // Явно используем переменную
    const currentUser = await this.usersRepository.findOneOrFail({
      where: { id: currentUserId },
    });
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedException('Only admin can delete users');
    }

    // Удаляем связанные записи в product_custom_field
    await this.customFieldsRepository.delete({ createdBy: { id } });
    // Удаляем связанные записи в product
    await this.productsRepository.delete({ createdBy: { id } });
    // Удаляем связанные записи в store
    await this.storesRepository.delete({ createdBy: { id } });
    // Удаляем связанные записи в store_product
    await this.storeProductsRepository.delete({ createdBy: { id } });

    // Логируем или используем userToDelete для дополнительной проверки
    console.log(`Deleting user with ID ${userToDelete.id}`);
    await this.usersRepository.delete(id);
  }
}
