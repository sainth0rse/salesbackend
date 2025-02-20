import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductCustomField } from '../../product-custom-fields/entities/product-custom-field.entity';
import { StoreProduct } from '../../store-products/entities/store-product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  image!: string;

  @OneToMany(
    () => ProductCustomField,
    (customField: ProductCustomField) => customField.product,
  )
  productCustomFields!: ProductCustomField[];

  @OneToMany(
    () => StoreProduct,
    (storeProduct: StoreProduct) => storeProduct.product,
  )
  storeProducts!: StoreProduct[];

  @ManyToOne(() => User, { nullable: true }) // Связь с пользователем, создавшим продукт
  @JoinColumn({ name: 'createdBy' }) // Имя столбца в базе
  createdBy!: User | null; // Опционально, может быть null
}
