import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationPusherService } from './notificationPuhser.service';
import { PusherService } from './pusher.service';
import { PusherNotification } from '../entities/pusherNotification.entity';
import { PusherNotificationMapper } from '../entities/pusherNotificationMapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PusherAuthController } from './pusher-auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PusherNotification, PusherNotificationMapper]),
  ],
  controllers: [NotificationController, PusherAuthController],
  providers: [NotificationPusherService, PusherService],
})
export class NotificationModule {}
