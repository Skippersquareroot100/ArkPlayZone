import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { Name } from '../entities/name.entity';
import { Street } from '../entities/street.entity';

@Injectable()
export class StaffDetailsService {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Name) private nameRepository: Repository<Name>,
    @InjectRepository(Street) private streetRepository: Repository<Street>,
  ) {}

  async getStaffDetails(role?: string, page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit ?? undefined;

    const [staff, total] = await this.staffRepository.findAndCount({
      where: role ? { role } : {},
      relations: ['name', 'address', 'address.street'],
      skip,
      take,
    });

    return {
      page: page ?? null,
      limit: limit ?? null,
      total,
      data: staff,
    };
  }

  async getPhotosName(email: string) {
    const staff = await this.staffRepository.findOne({ where: { email } });
    if (!staff) throw new HttpException('Staff not found', 404);
    return staff.photo;
  }
}
