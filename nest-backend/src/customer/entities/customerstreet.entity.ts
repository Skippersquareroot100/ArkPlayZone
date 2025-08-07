import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { CustomerAddress } from './customeraddress.entity';

@Entity()
export class CustomerStreet {
  @PrimaryGeneratedColumn()
  st_id: number;

  @Column({type : 'int'})
  street_no: number;

  @Column()
  street_name: string;

  @Column()
  apartment_name: string;

  @OneToOne(() => CustomerAddress, (customerAddress) => customerAddress.street)
  customerAddresses: CustomerAddress;
}
