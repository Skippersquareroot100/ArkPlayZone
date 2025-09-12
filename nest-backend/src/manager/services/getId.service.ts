import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { StaffFinancial } from '../entities/staffFinancial.entity';

@Injectable()
export class GetIdService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(StaffFinancial)
    private readonly staffFinancialRepository: Repository<StaffFinancial>,
  ) {}
  async getId(): Promise<any[]> {
    const res = await this.staffRepository.find({
      relations: ['name'],
      select: {
        staff_id: true,
        name: {
          firstName: true,
          middleName: true,
          lastName: true,
        },
      },
      order: { staff_id: 'ASC' },
    });
    console.log(res);
    return res.map((staff) => ({
      id: staff.staff_id,
      name: `${staff.name.firstName ?? ''} ${staff.name.middleName ?? ''} ${staff.name.lastName ?? ''}`.trim(),
    }));
  }

  async getStaffById(id: number) {
    const staff = await this.staffRepository.findOne({
      where: { staff_id: id },
      relations: ['name', 'address', 'address.street'],
    });
    if (!staff) {
      throw new Error('Staff not found');
    }
    return staff;
  }

  async getFinancialsById(id: number) {
    const staffWithFinancials = await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.financialRecords', 'financial') 
      .where('staff.staff_id = :id', { id })
      .select([
        'staff.staff_id',
        'staff.name',
        'staff.email', 
        'financial.netSalary',
        'financial.salary_date',
      ])
      .orderBy('financial.salary_date', 'DESC')
      .getOne();

    return staffWithFinancials;
  }
}
