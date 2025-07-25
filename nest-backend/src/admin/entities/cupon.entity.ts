import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  cupon_id: number;

  @Column({ length: 20 })
  code: string;

  @Column({ length: 20 })
  discount_type: string;

  @Column()
  max_usage: number;

  @Column({ type: 'date' })
  valid_from: Date;

  @Column({ type: 'date' })
  valid_until: Date;
}
