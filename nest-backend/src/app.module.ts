import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mailer/mailer.module';
import { ManagerModule } from './manager/manager.module';
//import { OtpModule } from './otp/otp.module'; // from the OTP update

@Module({
  imports: [
    AdminModule,
    EmployeeModule,
    ManagerModule,
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'ArkPlayZone_DB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailModule,
   // OtpModule, // from the OTP update
  ],
})
export class AppModule {}
