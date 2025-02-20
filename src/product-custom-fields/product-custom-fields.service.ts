import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCustomField } from './entities/product-custom-field.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductCustomFieldsService {
  constructor(
    @InjectRepository(ProductCustomField)
    private customFieldsRepository: Repository<ProductCustomField>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(productId: number): Promise<ProductCustomField[]> {
    return this.customFieldsRepository.find({ where: { productId } });
  }

  async findOne(id: number): Promise<ProductCustomField> {
    const customField = await this.customFieldsRepository.findOneBy({ id });
    if (!customField) {
      throw new NotFoundException(`Custom field with ID ${id} not found`);
    }
    return customField;
  }

  async create(
    customFieldData: Partial<ProductCustomField>,
    userId: number,
  ): Promise<ProductCustomField> {
    const { productId, key, value } = customFieldData;

    // Проверяем, существует ли продукт
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });

    const customField = this.customFieldsRepository.create({
      productId,
      key,
      value,
      createdBy: user,
    });
    return this.customFieldsRepository.save(customField);
  }

  async update(
    id: number,
    customFieldData: Partial<ProductCustomField>,
    userId: number,
  ): Promise<ProductCustomField> {
    const existingCustomField = await this.findOne(id);

    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });

    // Перезаписываем поля, в т.ч. указываем владельца
    Object.assign(existingCustomField, customFieldData, { createdBy: user });
    await this.customFieldsRepository.update(id, existingCustomField);

    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const customField = await this.findOne(id);

    // Если по какой-то причине createdBy == null, выбрасываем ошибку
    if (!customField.createdBy) {
      throw new ForbiddenException('Custom field has no owner — cannot delete');
    }

    // Проверяем, что удалять может только владелец
    if (customField.createdBy.id !== userId) {
      throw new ForbiddenException(
        'You are not the owner of this custom field',
      );
    }

    await this.customFieldsRepository.delete(id);
  }
}
