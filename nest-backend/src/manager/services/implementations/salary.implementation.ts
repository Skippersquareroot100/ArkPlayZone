import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SalaryDTO } from 'src/manager/DTOs/salary.dto';
import { SalaryInterface } from '../interfaces/salary.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/manager/entities/staff.entity';

@Injectable()
export class SalaryImplementation implements SalaryInterface {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async updateSalary(data: SalaryDTO): Promise<{ message: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log('data from service:', data);
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
