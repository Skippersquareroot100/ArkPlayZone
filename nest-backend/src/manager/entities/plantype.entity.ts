import { CustomerMembership } from 'src/customer/entities/customermembership.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class PlanType {
  @PrimaryGeneratedColumn()
  ptype_id: number;

  @Column()
  premium: string;

  @Column()
  basic: string;

  @ManyToOne(
    () => CustomerMembership,
    (customerMembership) => customerMembership.planType,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  customerMembership: CustomerMembership;
}
