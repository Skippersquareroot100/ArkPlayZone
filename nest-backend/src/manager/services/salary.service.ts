import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { SalaryDTO } from '../DTOs/salary.dto';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async updateSalary(data: SalaryDTO) {
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
    });

    if (!staff) {
      throw new HttpException('Staff not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.staffRepository.query(
        `CALL update_salary($1, $2, $3, $4, $5)`,
        [
          data.salary,
          data.deduction,
          data.overtime,
          data.overtime_rate,
          data.email,
        ],
      );

      return { message: 'Salary updated successfully' };
    } catch (error) {
      throw new HttpException(
        'Error updating salary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
