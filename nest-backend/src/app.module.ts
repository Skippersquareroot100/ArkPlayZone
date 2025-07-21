import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AdminModule, EmployeeModule, ManagerModule, CustomerModule],
})
export class AppModule {}
