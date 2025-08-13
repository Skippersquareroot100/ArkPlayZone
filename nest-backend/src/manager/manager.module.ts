import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
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
import { RegMailerService } from './regMailer.service';
import { MailModule } from 'src/mailer/mailer.module';
import { Loginservice } from './login.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RefreshTokenService } from './refreshToken.service';

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
    ]),
    MailModule,
    AuthModule,
  ],
  controllers: [ManagerController],
  providers: [
    RegMailerService,
    ManagerService,
    Loginservice,
    JwtAuthGuard,
    RefreshTokenService,
  ],
})
export class ManagerModule {}
