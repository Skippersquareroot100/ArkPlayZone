import { StaffDto } from './staff.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateStaffDTO extends PartialType(StaffDto) {}
