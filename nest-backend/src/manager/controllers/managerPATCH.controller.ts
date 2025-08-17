import {
  Body,
  Controller,
  HttpException,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PassResetService } from '../passReset.service';
import { UpdatePasswordDTO } from '../DTOs/updatePass.dto';

@Controller('manager')
export class ManagerPATCHController {
  constructor(private readonly passResetService: PassResetService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Patch('update-pass')
  async updatePassword(@Body() data: UpdatePasswordDTO) {
    try {
      const isUpdated = await this.passResetService.resetPass(data);
      return {
        statusCode: isUpdated ? 200 : 400,
        message: isUpdated
          ? 'Password updated successfully'
          : 'Password update failed',
        error: isUpdated ? '' : 'Unknown error',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Something went wrong',
        error: error instanceof Error ? error.message : 'Internal server error',
      };
    }
  }
}
