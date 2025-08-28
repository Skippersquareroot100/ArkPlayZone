import { HttpException, Injectable } from '@nestjs/common';
import { StaffDeleteInterface } from '../interfaces/staffDelete.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/manager/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffDeleteImplementation implements StaffDeleteInterface {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async deleteStaffById(email: string): Promise<{ message: string }> {
    console.log(`Deleting staff with email: ${email}`);
    const result = await this.staffRepository.delete({ email });

    if (result.affected === 0) {
      throw new HttpException('Staff not found', 404);
    }

    return { message: 'Staff deleted successfully' };
  }
}
