import { Injectable } from '@nestjs/common';
import { NameDto } from './DTOs/name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Name } from './entities/name.entity';
import { Staff } from './entities/staff.entity';
import { Address } from './entities/address.entity';
import { Street } from './entities/street.entity';
import { StaffDto } from './DTOs/staff.dto';
import { Shift } from './entities/shift.entity';
import { Activity } from 'src/admin/entities/activity.entity';
@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Name)
    private readonly nameRepository: Repository<Name>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(Street)
    private readonly streetRepository: Repository<Street>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}
  async createName(data: NameDto): Promise<Name> {
    const nameEntity = this.nameRepository.create(data);
    return await this.nameRepository.save(nameEntity);
  }
  async createStaff(data: StaffDto, photoFilename: string): Promise<void> {
    const nameEntity = this.nameRepository.create({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    });
    await this.nameRepository.save(nameEntity);

    const streetEntity = this.streetRepository.create({
      street_no: data.street_no,
      street_name: data.street_name,
      apartment_name: data.apartment_name,
    });
    await this.streetRepository.save(streetEntity);

    const addressEntity = this.addressRepository.create({
      city: data.city,
      postal_code: data.postal_code,
      street: streetEntity,
    });
    await this.addressRepository.save(addressEntity);

    const staffEntity = this.staffRepository.create({
      email: data.email,
      phone: data.phone,
      salary: data.salary,
      deduction: data.deduction,
      overtime: data.overtime,
      role: data.role,
      name: nameEntity,
      address: addressEntity,
      photo: photoFilename,
      password: data.password,
      incident_id: 1,
      shift_id: 1,
      activity_id: 1,
    });
    await this.staffRepository.save(staffEntity);
    console.log(data.date);
    console.log(data.facebook);
  }
  async getStaffPhoto(id: string): Promise<string> {
    const staff = await this.staffRepository.findOne({
      where: { staff_id: +id },
      select: ['photo'],
    });
    if (!staff) {
      throw new Error('Staff not found');
    }
    return staff.photo;
  }
}
