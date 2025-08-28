import { Staff } from 'src/manager/entities/staff.entity';

export interface StaffDetailsInterface {
  getStaffDetails(
    role?: string,
    page?: number,
    limit?: number,
  ): Promise<{
    page: number | null;
    limit: number | null;
    total: number;
    data: Staff[];
  }>;
  getPhotosName(email: string): Promise<string>;
}
