import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
@Entity()
export class CustomerName {
  @PrimaryGeneratedColumn()
  na_id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName: string;

  @OneToOne(() => Customer, (customer) => customer.name)
  customer: Customer;
}
