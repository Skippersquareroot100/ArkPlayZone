import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { CustomerStreet } from './customerstreet.entity';
import { Customer } from './customer.entity';

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  ad_id: number;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @OneToOne(
    () => CustomerStreet,
    (customerStreet) => customerStreet.customerAddresses,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'st_id' })
  street: CustomerStreet;

  @OneToOne(() => Customer, (customer) => customer.address)
  customer: Customer;
}
