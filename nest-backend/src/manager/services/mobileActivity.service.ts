import { Injectable } from '@nestjs/common';
import { MobileActivityDto } from '../DTOs/mobileActivity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MobileActivity } from '../entities/mobileActivity.entity';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class MobileActivityService {
  constructor(
    @InjectRepository(MobileActivity)
    private activityRepository: Repository<MobileActivity>,
  ) {}

  async createActivity(file: Express.Multer.File, dto: MobileActivityDto) {
    const activity = this.activityRepository.create({
      name: dto.name,
      photo: file.filename,
      description: dto.description || '',
    });
    await this.activityRepository.save(activity);
    return activity;
  }

 async getAllActivities(): Promise<
    { name: string; description: string; photo: string | null }[]
  > {
    const activities = await this.activityRepository.find();

    return activities.map(activity => {
      const filePath = path.join('./uploads', activity.photo);
      let photoBase64: string | null = null;

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        photoBase64 = fileBuffer.toString('base64');
      }

      return {
        name: activity.name,
        description: activity.description,
        photo: photoBase64,
      };
    });
  }
}
