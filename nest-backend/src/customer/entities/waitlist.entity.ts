import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Waitlist {
  @PrimaryGeneratedColumn()
  waitlist_id: number;

  @Column({ type: 'date' })
  request_date: Date;

  @Column({ type: 'varchar', length: 20 })
  priority: string;

  @OneToOne(() => Customer, (customer) => customer.waitlist)
  customer: Customer;
}
