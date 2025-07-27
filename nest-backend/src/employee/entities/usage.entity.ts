import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
@Entity()
export class Usage {
  @PrimaryGeneratedColumn()
  usage_id: number;

  @Column({ type: 'timestamp' })
  checkout_time: Date;

  @Column({ type: 'timestamp' })
  checkin_time: Date;

  @Column({ type: 'varchar', length: 200 })
  condition_note: string;

  @Column()
  customer_id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
