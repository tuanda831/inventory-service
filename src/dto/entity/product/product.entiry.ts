import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  shortCode: string;

  @Column()
  barcode: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
    nullable: false,
  })
  images: string[];

  @Column({
    type: 'timestamptz',
    default: () => 'NOW()::TIMESTAMPTZ',
  })
  createdAt: string;

  @Column({
    type: 'timestamptz',
    default: () => 'NOW()::TIMESTAMPTZ',
  })
  updatedAt: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  restoredAt: string;
}
