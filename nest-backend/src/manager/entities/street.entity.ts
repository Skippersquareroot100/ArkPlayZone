import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class Street {
  @PrimaryGeneratedColumn()
  st_id: number;

  @Column()
  street_no: string;

  @Column()
  street_name: string;

  @Column()
  apartment_name: string;

  @OneToOne(() => Address, (address) => address.street)
  address: Address;
}
