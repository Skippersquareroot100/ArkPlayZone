import { Activity } from 'src/admin/entities/activity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CustomerReview {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  rating: number;

  @Column()
  comments: string;

  @ManyToOne(() => Activity, (activity) => activity.reviews)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
