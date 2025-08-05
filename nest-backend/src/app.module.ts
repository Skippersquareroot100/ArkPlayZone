import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { address_entity, customer_Entity, otp_entity } from './customer/customer.entity';

@Module({
  imports: [AdminModule, EmployeeModule, ManagerModule, CustomerModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
    host: 'localhost',
    port: 5433, 
    username: 'postgres',
    password: '12345',
    database: 'ArkPlayZone',
    synchronize: true,
    autoLoadEntities: true,
    } ),
    TypeOrmModule.forFeature([customer_Entity, address_entity, otp_entity]),
    ],
  })
export class AppModule {}
