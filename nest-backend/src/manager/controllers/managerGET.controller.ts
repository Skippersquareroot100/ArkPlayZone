import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StaffDetailsService } from '../services/staffDetails.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { MobileActivityService } from '../services/mobileActivity.service';
import { PostNotificationService } from '../services/postNotification.service';
import { GetIdService } from '../services/getId.service';

@Controller('manager')
export class ManagerGETController {
  constructor(
    private staffDetailsService: StaffDetailsService,
    private mobileActivityService: MobileActivityService,
    private postNotificationService: PostNotificationService,
    private getIdService: GetIdService,
  ) {}

  @Get('details')
  async getdetalis(
    @Query('role') role: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    console.log('Incoming role from query:', role);
    return this.staffDetailsService.getStaffDetails(role, page, limit);
  }

  @Get('photos')
  async getAllPhotos(@Body('email') email: string, @Res() res) {
    const name = await this.staffDetailsService.getPhotosName(email);
    res.sendFile(name, { root: './uploads' });
  }

  @Get('test-token')
  @UseGuards(JwtAuthGuard)
  async testToken() {
    return {
      message: 'Token is valid!',
    };
  }

  @Get('activity')
  async getAllActivities() {
    const activities = await this.mobileActivityService.getAllActivities();

    return {
      status: 'success',
      data: activities,
    };
  }

  @Get('details/:id')
  async getStaffByID(@Param('id', ParseIntPipe) id: number) {
    return await this.staffDetailsService.getStaffByID(id);
  }

  @Get('notifications/:whom')
  async getAllNotifications(@Param('whom') whom: string) {
    try {
      return await this.postNotificationService.getAllNotifications(whom);
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.response?.message || 'notification fetch failed',
        error: 'no notification found',
      };
    }
  }

  @Get('getId')
  getId() {
    return this.getIdService.getId();
  }
}
