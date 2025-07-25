import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityType } from './activitytype.entity';
import { Location } from './location.entity';
import { Category } from './category.entiy';
import { Room } from './room.entity';
import { CustomerReview } from '../../customer/entities/customerreview.entity';
@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  acttype_id: number;

  @Column()
  location_id: number;

  @Column()
  cat_id: number;

  @Column()
  review_id: number;

  @Column()
  room_id: number;

  @ManyToOne(() => ActivityType)
  @JoinColumn({ name: 'acttype_id' })
  activityType: ActivityType;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'cat_id' })
  category: Category;

  @ManyToOne(() => CustomerReview)
  @JoinColumn({ name: 'review_id' })
  review: CustomerReview;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
