import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { StaffDeleteInterface } from './interfaces/staffDelete.interface';

@Injectable()
export class StaffDeleteService {
  constructor(
    @Inject('StaffDeleteInterface')
    private readonly staffDeleteInterface: StaffDeleteInterface,
  ) {}

  async deleteStaffById(email: string): Promise<{ message: string }> {
    return this.staffDeleteInterface.deleteStaffById(email);
  }
}
