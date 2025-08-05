import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  capacity: number;

  @Column()
  rate: number;

  @OneToMany(() => Activity, (activity) => activity.room)
  activities: Activity[];
}
