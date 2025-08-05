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
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
