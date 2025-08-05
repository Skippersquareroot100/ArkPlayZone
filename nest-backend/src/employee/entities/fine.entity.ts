import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FineType } from '../../admin/entities/finetype.entity';
import { Booking } from 'src/customer/entities/booking.entity';

@Entity()
export class Fine {
  @PrimaryGeneratedColumn()
  fine_id: number;

  @Column()
  overtime: number;

  @Column()
  finetype_id: number;

  @ManyToOne(() => FineType)
  @JoinColumn({ name: 'finetype_id' })
  fineType: FineType;

  @ManyToOne(() => Booking, (booking) => booking.fines)
  booking: Booking;
}
