import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityType } from './entities/activitytype.entity';
import { Category } from './entities/category.entiy';
import { Coupon } from './entities/cupon.entity';
import { Location } from './entities/location.entity';
import { FineType } from './entities/finetype.entity';
import { PaymentMethod } from './entities/paymentmethod.entity';
import { PaymentStatus } from './entities/paymentstatus.entity';
import { Room } from './entities/room.entity';
import { Slot } from './entities/slot.entity';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityType,
      Category,
      Coupon,
      Location,
      FineType,
      PaymentMethod,
      PaymentStatus,
      Room,
      Slot,
      Activity,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
