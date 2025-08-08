import { forwardRef, Module } from '@nestjs/common';
import { CustomerOtpService } from './customer_otp.service';
import { MailModule } from 'src/mailer/mailer.module';
import { CustomerModule } from '../customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customer_otp } from '../entities/cutomerOTP.entity';

@Module({
  imports :[ MailModule,
  TypeOrmModule.forFeature([customer_otp]),
  forwardRef(() => CustomerModule)],
  providers: [CustomerOtpService],
  exports: [CustomerOtpService], 
})
export class CustomerOtpModule {}
