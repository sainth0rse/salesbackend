import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCustomField } from './entities/product-custom-field.entity';

@Injectable()
export class ProductCustomFieldsService {
  constructor(
    @InjectRepository(ProductCustomField)
    private customFieldsRepository: Repository<ProductCustomField>,
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
    customField: Partial<ProductCustomField>,
  ): Promise<ProductCustomField> {
    const newCustomField = this.customFieldsRepository.create(customField);
    return this.customFieldsRepository.save(newCustomField);
  }

  async update(
    id: number,
    customField: Partial<ProductCustomField>,
  ): Promise<ProductCustomField> {
    await this.customFieldsRepository.update(id, customField);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.customFieldsRepository.delete(id);
  }
}
