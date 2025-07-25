import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationType } from './notificationtype.entity';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column()
  content: string;

  @Column()
  nottype_id: number;

  @ManyToOne(() => NotificationType)
  @JoinColumn({ name: 'nottype_id' })
  type: NotificationType;
}
