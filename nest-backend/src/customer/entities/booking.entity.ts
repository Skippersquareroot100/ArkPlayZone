import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Slot } from '../../admin/entities/slot.entity';
import { Fine } from '../../employee/entities/fine.entity';
import { Payment } from './payment.entity';
import { Activity } from '../../admin/entities/activity.entity';
import { Coupon } from '../../admin/entities/cupon.entity';
import { Customer } from './customer.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column({ type: 'date' })
  dates: Date;

  @Column({ length: 50 })
  activity_type: string;

  @ManyToOne(() => Slot, (slot) => slot.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slot_id' })
  slot: Slot;

  @OneToMany(() => Fine, (fine) => fine.booking)
  fines: Fine[];

  @OneToMany(() => Coupon, (coupon) => coupon.booking)
  coupons: Coupon[];

  @OneToOne(() => Activity, (activity) => activity.booking)
  @JoinColumn()
  activity: Activity;

  @OneToOne(() => Payment, (payment) => payment.booking)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Customer, (customer) => customer.booking, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
