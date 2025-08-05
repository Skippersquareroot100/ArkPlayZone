import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { PlanType } from '../../manager/entities/plantype.entity';
import { Customer } from './customer.entity';

@Entity()
export class CustomerMembership {
  @PrimaryGeneratedColumn()
  membership_id: number;

  @Column({ length: 200 })
  benefits: string;

  @OneToMany(() => PlanType, (planType) => planType.customerMembership)
  planType: PlanType[];

  @ManyToOne(() => Customer, (customer) => customer.memberships)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
