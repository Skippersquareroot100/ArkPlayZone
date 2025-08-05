import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
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

  @OneToOne(() => CustomerName, (customerName) => customerName.customer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'na_id' })
  name: CustomerName;

  @OneToOne(
    () => CustomerAddress,
    (customerAddress) => customerAddress.customer,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'ad_id' })
  address: CustomerAddress;

  @OneToMany(() => Booking, (booking) => booking.customer, { cascade: true })
  booking: Booking[];

  @OneToMany(() => Notification, (notification) => notification.customer, {
    cascade: true,
  })
  notifications: Notification[];

  @OneToMany(() => CustomerReview, (review) => review.customer, {
    cascade: true,
  })
  reviews: CustomerReview[];

  @OneToMany(() => Waiver, (waiver) => waiver.customer, {
    cascade: true,
  })
  waivers: Waiver[];

  @OneToOne(() => CustomerProfile, (profile) => profile.customer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: CustomerProfile;

  @OneToOne(() => CustomerCredentials, (credentials) => credentials.customer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'credid' })
  credentials: CustomerCredentials;

  @OneToMany(() => CustomerMembership, (membership) => membership.customer, {
    cascade: true,
  })
  memberships: CustomerMembership[];

  @OneToOne(() => Waitlist, (waitlist) => waitlist.customer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'waitlist_id' })
  waitlist: Waitlist;
}
