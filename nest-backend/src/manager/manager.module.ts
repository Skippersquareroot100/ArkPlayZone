import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanType } from './entities/plantype.entity';
import { NotificationType } from './entities/notificationtype.entity';
import { Notification } from './entities/notification.entity';
import { Waiver } from './entities/waiver.entity';
import { Street } from './entities/street.entity';
import { Address } from './entities/address.entity';
import { Name } from './entities/name.entity';
import { Equipment } from './entities/equiments.entity';
import { Shift } from './entities/shift.entity';
import { Supplier } from './entities/supplier.entity';
import { Staff } from './entities/staff.entity';
import { Activity } from 'src/admin/entities/activity.entity';
import { MailModule } from 'src/mailer/mailer.module';
import { Loginservice } from './services/login.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { StaffOTP } from './entities/staffOTP.entity';
import { StaffFinancial } from './entities/staffFinancial.entity';
import { ManagerPATCHController } from './controllers/managerPATCH.controller';
import { ManagerPUTController } from './controllers/managerPUT.controller';
import { ManagerGETController } from './controllers/managerGET.controller';
import { ManagerDELETEController } from './controllers/managerDELETE.controller';
import { ManagerController } from './controllers/managerPOST.controller';
import { PassResetService } from './services/passReset.service';
import { RefreshTokenService } from './services/refreshToken.service';
import { RegMailerService } from './services/regMailer.service';
import { SalaryService } from './services/salary.service';
import { StaffDeleteService } from './services/satffDelete.service';
import { StaffDetailsService } from './services/staffDetails.service';
import { StaffOTPService } from './services/staffOTP.service';
import { ManagerService } from './services/manager.service';
import { UpdateStaffService } from './services/updateStaff.service';
import { LoginImplementation } from './services/implementations/login.implimentation';
import { PassResetImplementation } from './services/implementations/passReset.implimentation';
import { managerImplementation } from './services/implementations/manager.implementation';
import { SalaryImplementation } from './services/implementations/salary.implementation';
import { StaffDeleteImplementation } from './services/implementations/staffDelete.implementation';
import { StaffDetailsImplementation } from './services/implementations/staffDetails.implementation';
import { StaffOTPImplementation } from './services/implementations/staffOTP.implementation';
import { UpdateStaffImplementation } from './services/implementations/updateStaff.implementation';
import { MobileActivityService } from './services/mobileActivity.service';
import { MobileActivity } from './entities/mobileActivity.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerCredentials } from 'src/customer/entities/customercredentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Activity,
      PlanType,
      NotificationType,
      Notification,
      Waiver,
      Street,
      Address,
      Name,
      PlanType,
      Shift,
      Supplier,
      Equipment,
      Staff,
      StaffOTP,
      StaffFinancial,
      MobileActivity,
      Customer,
      CustomerCredentials,
    ]),
    MailModule,
    AuthModule,
  ],
  controllers: [
    ManagerController,
    ManagerPATCHController,
    ManagerPUTController,
    ManagerGETController,
    ManagerDELETEController,
  ],
  providers: [
    RegMailerService,
    ManagerService,
    managerImplementation,
    {
      provide: 'ManagerInterface',
      useClass: managerImplementation,
    },
    Loginservice,
    LoginImplementation,
    {
      provide: 'LoginInterface',
      useClass: LoginImplementation,
    },
    JwtAuthGuard,
    RefreshTokenService,
    StaffOTPService,
    StaffOTPImplementation,
    {
      provide: 'StaffOTPInterface',
      useClass: StaffOTPImplementation,
    },
    PassResetService,
    PassResetImplementation,
    {
      provide: 'PassResetInterface',
      useClass: PassResetImplementation,
    },
    UpdateStaffService,
    UpdateStaffImplementation,
    {
      provide: 'UpdateStaffInterface',
      useClass: UpdateStaffImplementation,
    },
    StaffDetailsService,
    StaffDetailsImplementation,
    {
      provide: 'StaffDetailsInterface',
      useClass: StaffDetailsImplementation,
    },
    StaffDeleteService,
    StaffDeleteImplementation,
    {
      provide: 'StaffDeleteInterface',
      useClass: StaffDeleteImplementation,
    },
    SalaryService,
    SalaryImplementation,
    {
      provide: 'SalaryInterface',
      useClass: SalaryImplementation,
    },
    MobileActivityService,
  ],
})
export class ManagerModule {}
