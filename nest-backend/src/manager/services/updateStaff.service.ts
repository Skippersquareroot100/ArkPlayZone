import { Body, Inject, Injectable } from '@nestjs/common';
import { UpdateStaffDTO } from '../DTOs/updateStaff.dto';

import { UpdateStaffInterface } from './interfaces/updateStaff.interface';

@Injectable()
export class UpdateStaffService {
  constructor(
    @Inject('UpdateStaffInterface')
    private readonly updatestaffInterface: UpdateStaffInterface,
  ) {}

  async updateStaff(data: UpdateStaffDTO, id: number): Promise<void> {
    await this.updatestaffInterface.updateStaff(data, id);
  }
}
