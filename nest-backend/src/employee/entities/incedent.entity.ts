import { Staff } from 'src/manager/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  incident_id: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  resolution: string;

  @ManyToOne(() => Staff, (staff) => staff.incidents)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;
}
