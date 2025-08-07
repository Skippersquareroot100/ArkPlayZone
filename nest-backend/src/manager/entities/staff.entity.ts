import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  salary: number;

  @Column()
  photo: string;

  @Column({ type: 'varchar', nullable: false })
  password?: string;

  @OneToOne(() => Name, (name) => name.staff, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'na_id' })
  name: Name;

  @OneToOne(() => Address, (address) => address.staff, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ad_id' })
  address: Address;
 
  @OneToMany(() => Incident, (incident) => incident.staff)
  incidents: Incident[];

  @ManyToMany(() => Shift, (shift) => shift.staffs, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'staff_shifts' })
  shifts: Shift[];

  @ManyToOne(() => Activity, (activity) => activity.staffs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;
}
