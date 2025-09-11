import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PusherNotification } from '../entities/pusherNotification.entity';
import { PusherNotificationMapper } from '../entities/pusherNotificationMapper';
import { Repository } from 'typeorm';
import { PusherService } from './pusher.service';

@Injectable()
export class NotificationPusherService {
  constructor(
    @InjectRepository(PusherNotification)
    private pusherNotificationRepository: Repository<PusherNotification>,
    @InjectRepository(PusherNotificationMapper)
    private pusherNotificationMapperRepository: Repository<PusherNotificationMapper>,
    private readonly pusherService: PusherService,
  ) {}

  async createNotification(title: string, message: string, ids: number[]) {
    const notification = this.pusherNotificationRepository.create({
      title,
      message,
    });

    await this.pusherNotificationRepository.save(notification);

    const mappers = ids.map((id) =>
      this.pusherNotificationMapperRepository.create({
        staff: { staff_id: id },
        pusherNotification: notification,
      }),
    );

    await this.pusherNotificationMapperRepository.save(mappers);

    for (const id of ids) {
      await this.pusherService.trigger(
        `private-user-${id}`,
        'new-notification',
        {
          id: notification.id,
          title: notification.title,
          message: notification.message,
          date: notification.date,
        },
      );
    }

    return notification;
  }

  async getNotifications(staffId: number) {
    return this.pusherNotificationMapperRepository.find({
      where: { staff: { staff_id: staffId } },
      relations: ['pusherNotification'],
      order: { pusherNotification: { date: 'DESC' } },
    });
  }

  async markAsRead(StaffId: number, notificationId: number) {
    const mapper = await this.pusherNotificationMapperRepository.findOne({
      where: {
        staff: { staff_id: StaffId },
        pusherNotification: { id: notificationId },
      },
    });
    if (!mapper) {
      return null;
    }
    mapper.isRead = true;
    return this.pusherNotificationMapperRepository.save(mapper);
  }
}
