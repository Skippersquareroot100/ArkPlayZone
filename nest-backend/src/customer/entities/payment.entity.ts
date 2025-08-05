import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { PaymentMethod } from '../../admin/entities/paymentmethod.entity';
import { PaymentStatus } from '../../admin/entities/paymentstatus.entity';
import { Booking } from './booking.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  amount: number;

  @Column()
  method_id: number;

  @Column()
  status_id: number;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'method_id' })
  method: PaymentMethod;

  @ManyToOne(() => PaymentStatus)
  @JoinColumn({ name: 'status_id' })
  status: PaymentStatus;

  @OneToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn()
  booking: Booking;
}
