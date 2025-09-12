import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/manager/entities/address.entity';
import { Name } from 'src/manager/entities/name.entity';
import { Staff } from 'src/manager/entities/staff.entity';
import { Street } from 'src/manager/entities/street.entity';
import { Repository } from 'typeorm';
import { StaffDetailsInterface } from '../interfaces/staffDetails.interface';

@Injectable()
export class StaffDetailsImplementation implements StaffDetailsInterface {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Name) private nameRepository: Repository<Name>,
    @InjectRepository(Street) private streetRepository: Repository<Street>,
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

  async getPhotosName(id: number): Promise<string> {
    const staff = await this.staffRepository.findOne({ where: { staff_id: id } });
    if (!staff) throw new HttpException('Staff not found', 404);
    return staff.photo;
  }
}
