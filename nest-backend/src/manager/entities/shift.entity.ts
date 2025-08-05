import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Staff } from './staff.entity';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  shift_id: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'date' })
  dates: Date;
  @ManyToMany(() => Staff, (staff) => staff.shifts)
  staffs: Staff[];
}
