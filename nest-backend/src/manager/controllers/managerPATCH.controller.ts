import {
  Body,
  Controller,
  HttpException,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PassResetService } from '../services/passReset.service';
import { UpdatePasswordDTO } from '../DTOs/updatePass.dto';
import { SalaryDTO } from '../DTOs/salary.dto';
import { SalaryService } from '../services/salary.service';
import { error } from 'console';

@Controller('manager')
export class ManagerPATCHController {
  constructor(
    private readonly passResetService: PassResetService,
    private readonly salaryService: SalaryService,
  ) {}

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

  @Patch('salary')
  async updateSalary(@Body() data: SalaryDTO) {
    try {
      console.log(data);
      const result = await this.salaryService.updateSalary(data);
      return {
        statusCode: 200,
        message: 'Salary updated successfully',
        error: '',
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
