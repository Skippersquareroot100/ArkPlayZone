import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Slot } from '../../admin/entities/slot.entity';
import { Fine } from '../../employee/entities/fine.entity';
import { Payment } from './payment.entity';
import { Activity } from '../../admin/entities/activity.entity';
import { Coupon } from '../../admin/entities/cupon.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column({ type: 'date' })
  dates: Date;

  @Column({ length: 50 })
  activity_type: string;

  @Column()
  slot_id: number;

  @Column()
  fine_id: number;

  @Column()
  cupon_id: number;

  @Column()
  activity_id: number;

  @Column()
  payment_id: number;

  @ManyToOne(() => Slot)
  @JoinColumn({ name: 'slot_id' })
  slot: Slot;

  @ManyToOne(() => Fine)
  @JoinColumn({ name: 'fine_id' })
  fine: Fine;

  @ManyToOne(() => Coupon)
  @JoinColumn({ name: 'cupon_id' })
  coupon: Coupon;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;
}
