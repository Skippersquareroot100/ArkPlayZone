import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mailer/mailer.module';

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
      database: 'ArkPlayZone',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailModule,
  ],
})
export class AppModule {}
