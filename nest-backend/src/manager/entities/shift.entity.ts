import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
