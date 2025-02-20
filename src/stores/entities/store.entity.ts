import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StoreProduct } from '../../store-products/entities/store-product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  city!: string;

  @OneToMany(
    () => StoreProduct,
    (storeProduct: StoreProduct) => storeProduct.store,
  )
  storeProducts!: StoreProduct[];

  @ManyToOne(() => User, { nullable: true }) // Связь с пользователем, создавшим склад
  @JoinColumn({ name: 'createdBy' })
  createdBy!: User | null; // Опционально, может быть null
}
