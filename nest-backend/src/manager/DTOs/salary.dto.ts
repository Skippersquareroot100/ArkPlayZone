import { PickType } from '@nestjs/mapped-types';
import { StaffDto } from './staff.dto';
import { IsNotEmpty } from 'class-validator';

export class SalaryDTO extends PickType(StaffDto, [
  'salary',
  'email',
  'overtime',
  'deduction',
] as const) {
  @IsNotEmpty()
  overtime_rate: number;
}
