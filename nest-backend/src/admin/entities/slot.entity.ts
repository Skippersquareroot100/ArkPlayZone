import { Booking } from 'src/customer/entities/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  slot_id: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column()
  pass: string;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @OneToMany(() => Booking, (booking) => booking.slot, { onDelete: 'CASCADE' })
  bookings: Booking[];
}
