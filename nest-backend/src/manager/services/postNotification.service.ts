import { HttpException, Injectable } from '@nestjs/common';
import { PostNotificationDto } from '../DTOs/postNotification.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostNotification } from '../entities/postNotification';

@Injectable()
export class PostNotificationService {
  constructor(
    @InjectRepository(PostNotification)
    private postNotificationRepository: Repository<PostNotification>,
  ) {}

  async postNotification(dto: PostNotificationDto) {
    const notification = this.postNotificationRepository.create({
      title: dto.title,
      message: dto.message,
      for: dto.for,
      date: new Date(),
    });
    try {
      await this.postNotificationRepository.save(notification);
    } catch (error) {
      throw new HttpException('Failed to create notification', 500);
    }
  }

  async getAllNotifications(whom: string) {
    try {
      return await this.postNotificationRepository.find({
        where: { for: whom },
      });
    } catch (error) {
      throw new HttpException('Failed to fetch notifications', 500);
    }
  }
}
