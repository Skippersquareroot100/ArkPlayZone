import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Staff } from './staff.entity';
import { PusherNotification } from './pusherNotification.entity';

@Entity()
export class PusherNotificationMapper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.mapper, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @ManyToOne(
    () => PusherNotification,
    (pusherNotification) => pusherNotification.mapper,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'Pusher_Notification_id' })
  pusherNotification: PusherNotification;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
