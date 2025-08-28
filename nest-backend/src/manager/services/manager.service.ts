import { Injectable, Inject } from '@nestjs/common';

import { ManagerInterface } from './interfaces/manager.interface';
import { StaffDto } from '../DTOs/staff.dto';
@Injectable()
export class ManagerService {
  constructor(
    @Inject('ManagerInterface')
    private readonly managerInterface: ManagerInterface,
  ) {}

  async createStaff(data: StaffDto, photoFilename: string): Promise<void> {
    await this.managerInterface.createStaff(data, photoFilename);
  }
}
