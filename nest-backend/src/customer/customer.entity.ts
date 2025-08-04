import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('Customer')
export class customer_Entity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 150 })
  uniqueId: string;

  @BeforeInsert()
  gen_uuid() {
    this.uniqueId = uuidv4();
  }

  @CreateDateColumn({ type: 'timestamp' })
  joiningDate: Date;
  //"2025-08-04 03:45:32.267709"

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;
  @BeforeInsert()
  fix_country() {
    if (!this.country || this.country.trim() === '') {
      this.country = 'Unknown';
    }
  }
}

@Entity('Customer_tb')
export class customerEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: '50' })
  first_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: Date;


  @Column({ type: 'varchar', length: '50' })
  last_name: string;

  @Column({ type: 'varchar', length: 14 })
  phone_number: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;
}

@Entity('customer_address')
export class address_entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'int' })
  postal_code: Number;

  @Column({ type: 'int' })
  street_no: number;

  @Column({ type: 'varchar', length: 50 })
  street_name: string;
}
