import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  maintanace_id: number;

  @Column()
  repair_cost: number;

  @Column({ type: 'date' })
  repair_date: Date;
}
