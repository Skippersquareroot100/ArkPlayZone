import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Waitlist {
  @PrimaryGeneratedColumn()
  waitlist_id: number;

  @Column({ type: 'date' })
  request_date: Date;

  @Column({ type: 'varchar', length: 20 })
  priority: string;
}
