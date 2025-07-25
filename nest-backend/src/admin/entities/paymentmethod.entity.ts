import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  method_id: number;

  @Column({ length: 10 })
  card: string;

  @Column({ length: 10 })
  mobile: string;
}
