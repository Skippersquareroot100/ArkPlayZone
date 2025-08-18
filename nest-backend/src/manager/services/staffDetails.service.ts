import { Inject, Injectable } from '@nestjs/common';
import { Staff } from '../entities/staff.entity';
import { StaffDetailsInterface } from './interfaces/staffDetails.interface';

@Injectable()
export class StaffDetailsService {
  constructor(
    @Inject('StaffDetailsInterface')
    private readonly staffDetailsInterface: StaffDetailsInterface,
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
}
