import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';

@Injectable()
export class GetIdService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
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
}
