import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerStreet } from './customerstreet.entity';

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  ad_id: number;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  st_id: number;

  @ManyToOne(() => CustomerStreet)
  @JoinColumn({ name: 'st_id' })
  street: CustomerStreet;
}
