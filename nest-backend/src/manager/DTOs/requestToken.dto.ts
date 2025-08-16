import { PickType } from '@nestjs/mapped-types';
import { StaffDto } from './staff.dto';
export class TokenRequestDTO extends PickType(StaffDto, ['email'] as const) {}
