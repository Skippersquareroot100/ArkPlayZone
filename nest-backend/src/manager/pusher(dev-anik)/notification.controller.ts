import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateNotificationDto } from './createNotification.dto';
import { NotificationPusherService } from './notificationPuhser.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationPusherService,
  ) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.createNotification(
      dto.title,
      dto.message,
      dto.staffIds,
    );
  }

  @Get('staff/:id')
  async getStaffNotifications(@Param('id') staffId: number) {
    return this.notificationService.getNotifications(staffId);
  }

  @Post('staff/:staffId/read/:notificationId')
  async markAsRead(
    @Param('staffId') staffId: number,
    @Param('notificationId') notificationId: number,
  ) {
    return this.notificationService.markAsRead(staffId, notificationId);
  }
}
