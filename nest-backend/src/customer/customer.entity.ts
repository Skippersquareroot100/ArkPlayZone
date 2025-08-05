import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
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

  @Column({ type: 'varchar', length: 50, default: 'Unknown' })
  street_name: string;
}

@Entity('Customer')
export class customer_Entity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: '50' })
  first_name: string;

  @Column({ type: 'varchar', length: '50' })
  last_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: Date;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 14 })
  phone_number: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @OneToOne(() => address_entity, { cascade: true })
  @JoinColumn()
  address: address_entity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_path: string;

  @Column({type : 'varchar' , name : 'status' , default : 'inactive' })
  status : string
}
@Entity('otp')
export class otp_entity{
    @PrimaryGeneratedColumn()
    id : number ;


    @Column({type : 'varchar' ,length : 100})
    otp_signature : string;


    @BeforeInsert()
    gen_uuid(){
        this.otp_signature = uuidv4();
    }
    @CreateDateColumn({type : 'timestamp' })
    creation_time : Date;

    @Column({type : 'int'})
    otp_key : number ;

    @Column({type : 'int' , default : 0})
    otp_send_count : number;

    @OneToOne(()=> customer_Entity, {cascade : true})
    @JoinColumn({name : 'customer_id'})
    customer_id : customer_Entity

}
