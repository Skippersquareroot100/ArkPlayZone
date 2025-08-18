import { Body, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { UpdateStaffDTO } from '../DTOs/updateStaff.dto';
import { Name } from '../entities/name.entity';
import { Street } from '../entities/street.entity';
import { Address } from '../entities/address.entity';
import { UpdateStaffInterface } from './interfaces/updateStaff.interface';

@Injectable()
export class UpdateStaffService {
  constructor(
    @Inject('UpdateStaffInterface')
    private readonly updatestaffInterface: UpdateStaffInterface,
  ) {}

  async updateStaff(data: UpdateStaffDTO): Promise<void> {
    await this.updatestaffInterface.updateStaff(data);
  }
}
