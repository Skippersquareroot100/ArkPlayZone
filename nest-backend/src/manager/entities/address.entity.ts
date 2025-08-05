import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Street } from './street.entity';
import { Staff } from './staff.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  ad_id: number;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  st_id: number;

  @OneToOne(() => Street, (street) => street.st_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'st_id' })
  street: Street;

  @OneToOne(() => Staff, (staff) => staff.address)
  staff: Staff;
}
