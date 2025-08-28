import { Inject, Injectable } from '@nestjs/common';
import { Staff } from '../entities/staff.entity';
import { StaffDetailsInterface } from './interfaces/staffDetails.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StaffDetailsService {
  constructor(
    @Inject('StaffDetailsInterface')
    private readonly staffDetailsInterface: StaffDetailsInterface,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async getStaffDetails(
    role?: string,
    page?: number,
    limit?: number,
  ): Promise<{
    page: number | null;
    limit: number | null;
    total: number;
    data: Staff[];
  }> {
    return this.staffDetailsInterface.getStaffDetails(role, page, limit);
  }

  async getPhotosName(email: string): Promise<string> {
    return this.staffDetailsInterface.getPhotosName(email);
  }

  async getStaffByID(id: number): Promise<Staff | null> {
    return this.staffRepository.findOne({
      where: { staff_id: id },
      relations: ['name', 'address', 'address.street'],
    });
  }
}
