import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ActivityType } from './activitytype.entity';
import { Location } from './location.entity';
import { Category } from './category.entiy';
import { Room } from './room.entity';
import { CustomerReview } from '../../customer/entities/customerreview.entity';
import { Booking } from 'src/customer/entities/booking.entity';
import { Staff } from 'src/manager/entities/staff.entity';
@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @Column({ length: 100 })
  name: string;


  @ManyToOne(() => ActivityType, (activityType) => activityType.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'acttype_id' })
  activityType: ActivityType;

  @ManyToOne(() => Location, (location) => location.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToMany(() => Category, (category) => category.activities)
  @JoinTable({
    name: 'activity_categories',
    joinColumn: { name: 'activity_id', referencedColumnName: 'activity_id' },
    inverseJoinColumn: { name: 'cat_id', referencedColumnName: 'cat_id' },
  })
  categories: Category[];

  @OneToMany(() => CustomerReview, (review) => review.activity)
  reviews: CustomerReview[];

  @ManyToOne(() => Room, (room) => room.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @OneToOne(() => Booking, (booking) => booking.activity)
  booking: Booking;

  @OneToMany(() => Staff, (staff) => staff.activity, {
    onDelete: 'CASCADE',
  })
  staffs: Staff[];
}
