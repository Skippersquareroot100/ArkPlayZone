import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanType } from '../../manager/entities/plantype.entity';

@Entity()
export class CustomerMembership {
  @PrimaryGeneratedColumn()
  membership_id: number;

  @Column({ length: 200 })
  benefits: string;

  @Column()
  ptype_id: number;

  @ManyToOne(() => PlanType)
  @JoinColumn({ name: 'ptype_id' })
  planType: PlanType;
}
