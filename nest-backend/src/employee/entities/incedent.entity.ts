import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  incident_id: number;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  resolution: string;
}
