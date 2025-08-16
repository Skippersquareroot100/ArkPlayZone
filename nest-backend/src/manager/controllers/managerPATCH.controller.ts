import {
  Body,
  Controller,
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
    await this.passResetService.resetPass(data);
    return { message: 'Password updated successfully' };
  }
}
