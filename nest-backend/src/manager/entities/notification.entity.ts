import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { NotificationType } from './notificationtype.entity';
import { Customer } from 'src/customer/entities/customer.entity';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column()
  content: string;

  @Column()
  nottype_id: number;

  @OneToMany(
    () => NotificationType,
    (notificationType) => notificationType.nottype_id,
    {
      onDelete: 'CASCADE',
    },
  )
  type: NotificationType[];

  @ManyToOne(() => Customer, (customer) => customer.notifications)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
