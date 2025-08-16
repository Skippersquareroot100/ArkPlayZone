import { PickType } from '@nestjs/mapped-types';
import { StaffDto } from './staff.dto';

export class StaffLoginDTO extends PickType(StaffDto, [
  'email',
  'password',
] as const) {}
