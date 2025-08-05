import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CustomerCredentials {
  @PrimaryGeneratedColumn()
  credid: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  profile_photo: string;
  @OneToOne(() => Customer, (customer) => customer.credentials)
  customer: Customer;
}
