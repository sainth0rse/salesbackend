import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ProductCustomField {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product: Product) => product.productCustomFields, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column()
  productId!: number;

  @Column()
  key!: string;

  @Column()
  value!: string;

  @ManyToOne(() => User, { nullable: true }) // Связь с пользователем, создавшим кастомное поле
  @JoinColumn({ name: 'createdBy' })
  createdBy!: User | null; // Опционально, может быть null
}
