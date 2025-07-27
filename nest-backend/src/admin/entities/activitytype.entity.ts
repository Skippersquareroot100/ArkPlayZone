import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
  acttype_id: number;

  @Column({ length: 50 })
  adult: string;

  @Column({ length: 50 })
  baby: string;

  @Column({ length: 50 })
  mixed: string;
}
