import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { address_entity, customer_Entity, otp_entity } from './customer.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports : [TypeOrmModule.forFeature([customer_Entity,address_entity,otp_entity]),
  MailerModule.forRoot({
    transport : {
      host : 'smtp.gmail.com',
      port : 465 ,
      ignoreTLS : true,
      secure : true,
      auth : {
        user : 'swajanbarua09@gmail.com',
        pass : 'wyhlmxrrkkespujy'
      }
    }
  })],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
