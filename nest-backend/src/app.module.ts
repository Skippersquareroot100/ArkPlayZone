import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [UserModule, AdminModule, EmployeeModule, ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
