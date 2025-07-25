import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
  acttype_id: number;

  @Column({ length: 10 })
  adult: string;

  @Column({ length: 10 })
  baby: string;

  @Column({ length: 10 })
  mixed: string;
}
