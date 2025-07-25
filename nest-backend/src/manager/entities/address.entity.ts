import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Street } from './street.entity';

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

  @ManyToOne(() => Street)
  @JoinColumn({ name: 'st_id' })
  street: Street;
}
