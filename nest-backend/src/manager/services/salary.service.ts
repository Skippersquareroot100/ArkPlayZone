import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { SalaryDTO } from '../DTOs/salary.dto';
import { SalaryInterface } from './interfaces/salary.interface';

@Injectable()
export class SalaryService {
  constructor(
   @Inject('SalaryInterface')
   private readonly salaryInterface: SalaryInterface,
  ) {}

  async updateSalary(data: SalaryDTO): Promise<{ message: string }> {
    return this.salaryInterface.updateSalary(data);
  }
}
