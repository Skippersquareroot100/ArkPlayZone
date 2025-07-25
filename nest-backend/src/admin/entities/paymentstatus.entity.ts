import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ length: 10 })
  paid: string;

  @Column({ length: 10 })
  refund: string;
}
