import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Name } from './name.entity';
import { Address } from './address.entity';
import { Incident } from '../../employee/entities/incedent.entity';
import { Shift } from './shift.entity';
import { Activity } from '../../admin/entities/activity.entity';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  staff_id: number;

  @Column()
  deduction: number;

  @Column()
  overtime: number;

  @Column({ type: 'varchar', length: 50 })
  role: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  salary: number;

  @Column()
  na_id: number;

  @Column()
  ad_id: number;

  @Column()
  incident_id: number;

  @Column()
  shift_id: number;

  @Column()
  activity_id: number;

  @ManyToOne(() => Name)
  @JoinColumn({ name: 'na_id' })
  name: Name;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'ad_id' })
  address: Address;

  @ManyToOne(() => Incident)
  @JoinColumn({ name: 'incident_id' })
  incident: Incident;

  @ManyToOne(() => Shift)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;
}
