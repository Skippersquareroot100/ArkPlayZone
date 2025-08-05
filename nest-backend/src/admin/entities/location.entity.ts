import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column({ length: 50 })
  zone: string;

  @Column({ length: 10 })
  floor: string;
  @OneToMany(() => Activity, (activity) => activity.location)
  activities: Activity[];
}
