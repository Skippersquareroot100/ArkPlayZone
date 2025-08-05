import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CustomerProfile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  loyality_points: number;

  @Column()
  achivement: string;

  @OneToOne(() => Customer, (customer) => customer.profile)
  customer: Customer;
}
