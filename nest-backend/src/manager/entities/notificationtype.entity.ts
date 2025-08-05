import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
export class NotificationType {
  @PrimaryGeneratedColumn()
  nottype_id: number;

  @Column()
  promotion: string;

  @Column()
  reminder: string;

  @ManyToOne(() => Notification, (notification) => notification.type)
  notification: Notification;
}
