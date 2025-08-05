import { Customer } from 'src/customer/entities/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Waiver {
  @PrimaryGeneratedColumn()
  waiver_id: number;

  @Column()
  emergency_contact: string;

  @Column()
  medical_condition: string;
  @ManyToOne(() => Customer, (customer) => customer.waivers)
  customer: Customer;
}
