import { PickType } from '@nestjs/mapped-types';
import { StaffDto } from './staff.dto';
import { IsNotEmpty } from 'class-validator';
export class VerifyOTPDTO extends PickType(StaffDto, ['email'] as const) {
  @IsNotEmpty()
  otp: string;
}
