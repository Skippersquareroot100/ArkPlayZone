import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';

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

  @OneToMany(() => Activity, (activity) => activity.activityType)
  activities: Activity[];
}
