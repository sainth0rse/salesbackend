import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Store } from '../../stores/entities/store.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class StoreProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column()
  productId!: number;

  @ManyToOne(() => Store, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  store!: Store;

  @Column()
  storeId!: number;

  @Column()
  stock!: number;

  @ManyToOne(() => User, { nullable: true }) // Связь с пользователем, создавшим связь
  @JoinColumn({ name: 'createdBy' })
  createdBy!: User | null; // Опционально, может быть null
}
