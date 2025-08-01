import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerName } from './entities/customername.entity';
import { DummyEntity } from './entities/dummy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerReview } from './entities/customerreview.entity';
import { CustomerAddress } from './entities/customeraddress.entity';
import { CustomerStreet } from './entities/customerstreet.entity';
import { CustomerCredentials } from './entities/customercredentials.entity';
import { CustomerMembership } from './entities/customermembership.entity';
import { CustomerProfile } from './entities/customerprofile.entity';
import { Payment } from './entities/payment.entity';
import { Waitlist } from './entities/waitlist.entity';
import { Booking } from './entities/booking.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerName,
      DummyEntity,
      CustomerReview,
      CustomerStreet,
      CustomerAddress,
      CustomerCredentials,
      CustomerMembership,
      CustomerProfile,
      Payment,
      Waitlist,
      Booking,
      Customer,
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
