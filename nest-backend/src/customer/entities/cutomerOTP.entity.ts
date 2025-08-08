import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './customer.entity';
@Entity('customer_otp')
export class customer_otp{
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

    @OneToOne(()=> Customer, {cascade : true})
    @JoinColumn({name : 'customer_id'})
    customer_id : Customer;

}