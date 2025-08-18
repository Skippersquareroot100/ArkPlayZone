import { SalaryDTO } from 'src/manager/DTOs/salary.dto';

export interface SalaryInterface {
  updateSalary(data: SalaryDTO): Promise<{ message: string }>;
}
