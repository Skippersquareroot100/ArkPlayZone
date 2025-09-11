import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PusherNotificationMapper } from './pusherNotificationMapper';

@Entity()
export class PusherNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  message: string;

  @CreateDateColumn()
  date: Date;

  @OneToMany(
    () => PusherNotificationMapper,
    (pusherNotificationMapper) => pusherNotificationMapper.pusherNotification,
  )
  mapper: PusherNotificationMapper[];
}
