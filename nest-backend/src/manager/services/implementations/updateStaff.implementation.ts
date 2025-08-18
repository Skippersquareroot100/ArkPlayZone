import { HttpException, Injectable } from '@nestjs/common';
import { UpdateStaffInterface } from '../interfaces/updateStaff.interface';
import { UpdateStaffDTO } from 'src/manager/DTOs/updateStaff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/manager/entities/address.entity';
import { Name } from 'src/manager/entities/name.entity';
import { Staff } from 'src/manager/entities/staff.entity';
import { Street } from 'src/manager/entities/street.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateStaffImplementation implements UpdateStaffInterface {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(Name)
    private readonly nameRepository: Repository<Name>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Street)
    private readonly streetRepository: Repository<Street>,
  ) {}

  async updateStaff(data: UpdateStaffDTO): Promise<void> {
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
    });
    if (!staff) {
      throw new HttpException('Staff not found', 404);
    }
    console.log(staff);
    const name = await this.nameRepository.findOne({
      where: { na_id: staff.staff_id },
    });
    if (!name) {
      throw new HttpException('Name not found', 404);
    }
    console.log(name);
    const address = await this.addressRepository.findOne({
      where: { ad_id: staff.staff_id },
    });
    if (!address) {
      throw new HttpException('Address not found', 404);
    }

    const street = await this.streetRepository.findOne({
      where: { st_id: address.ad_id },
    });
    if (!street) {
      throw new HttpException('Street not found', 404);
    }

    name.firstName = data.firstName || name.firstName;
    name.middleName = data.middleName || name.middleName;
    name.lastName = data.lastName || name.lastName;

    street.street_name = data.street_name || street.street_name;
    street.street_no = data.street_no || street.street_no;
    street.apartment_name = data.apartment_name || street.apartment_name;

    address.city = data.city || address.city;
    address.postal_code = data.postal_code || address.postal_code;

    staff.phone = data.phone || staff.phone;
    staff.password = data.password || staff.password;
    staff.photo = data.file || staff.photo;

    try {
      await this.nameRepository.save(name);
    } catch (e) {
      throw new HttpException('name not created!', 400);
    }
    try {
      await this.streetRepository.save(street);
    } catch (e) {
      throw new HttpException('street not created!', 400);
    }
    try {
      await this.addressRepository.save(address);
    } catch (e) {
      throw new HttpException('address not created!', 400);
    }
    try {
      await this.staffRepository.save(staff);
    } catch (e) {
      throw new HttpException('staff not created!', 400);
    }
  }
}
