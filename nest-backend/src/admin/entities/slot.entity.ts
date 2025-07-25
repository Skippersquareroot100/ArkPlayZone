import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  slot_id: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column()
  pass: string;

  @Column({ type: 'timestamp' })
  end_time: Date;
}
