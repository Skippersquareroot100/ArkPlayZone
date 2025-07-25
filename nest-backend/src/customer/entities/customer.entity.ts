import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerName } from './customername.entity';
import { CustomerAddress } from './customeraddress.entity';
import { Booking } from './booking.entity';
import { Notification } from '../../manager/entities/notification.entity';
import { CustomerReview } from './customerreview.entity';
import { CustomerProfile } from './customerprofile.entity';
import { CustomerCredentials } from './customercredentials.entity';
import { Waiver } from '../../manager/entities/waiver.entity';
import { CustomerMembership } from './customermembership.entity';
import { Waitlist } from './waitlist.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  na_id: number;

  @Column()
  ad_id: number;

  @Column()
  booking_id: number;

  @Column()
  notification_id: number;

  @Column()
  review_id: number;

  @Column()
  waiver_id: number;

  @Column()
  profile_id: number;

  @Column()
  credid: number;

  @Column()
  membership_id: number;

  @Column()
  waitlist_id: number;

  @ManyToOne(() => CustomerName)
  @JoinColumn({ name: 'na_id' })
  name: CustomerName;

  @ManyToOne(() => CustomerAddress)
  @JoinColumn({ name: 'ad_id' })
  address: CustomerAddress;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => Notification)
  @JoinColumn({ name: 'notification_id' })
  notification: Notification;

  @ManyToOne(() => CustomerReview)
  @JoinColumn({ name: 'review_id' })
  review: CustomerReview;

  @ManyToOne(() => Waiver)
  @JoinColumn({ name: 'waiver_id' })
  waiver: Waiver;

  @ManyToOne(() => CustomerProfile)
  @JoinColumn({ name: 'profile_id' })
  profile: CustomerProfile;

  @ManyToOne(() => CustomerCredentials)
  @JoinColumn({ name: 'credid' })
  credentials: CustomerCredentials;

  @ManyToOne(() => CustomerMembership)
  @JoinColumn({ name: 'membership_id' })
  membership: CustomerMembership;

  @ManyToOne(() => Waitlist)
  @JoinColumn({ name: 'waitlist_id' })
  waitlist: Waitlist;
}
