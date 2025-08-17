import { Body, Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { StaffDetailsService } from '../staffDetails.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('manager')
export class ManagerGETController {
  constructor(private staffDetailsService: StaffDetailsService) {}

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
}
