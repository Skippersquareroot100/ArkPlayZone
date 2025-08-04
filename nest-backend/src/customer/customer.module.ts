import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customer_Entity } from './customer.entity';

@Module({
  imports : [TypeOrmModule.forFeature([customer_Entity]),],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
