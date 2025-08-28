import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ManagerInterface } from '../interfaces/manager.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/admin/entities/activity.entity';
import { StaffDto } from 'src/manager/DTOs/staff.dto';
import { Name } from 'src/manager/entities/name.entity';
import { Shift } from 'src/manager/entities/shift.entity';
import { Staff } from 'src/manager/entities/staff.entity';
import { Street } from 'src/manager/entities/street.entity';
import { Repository } from 'typeorm';
import { RegMailerService } from '../regMailer.service';
import { Address } from 'src/manager/entities/address.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class managerImplementation implements ManagerInterface {
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
    private readonly regMailerService: RegMailerService,
  ) {}

  async createStaff(data: StaffDto, photoFilename: string): Promise<void> {
    try {
      if (
        await this.staffRepository.findOne({ where: { email: data.email } })
      ) {
        throw new ConflictException('Email already exists');
      }

      console.log('Creating name entity...');
      const nameEntity = this.nameRepository.create({
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
      });
      await this.nameRepository.save(nameEntity);
      console.log('Name saved:', nameEntity);

      const streetEntity = this.streetRepository.create({
        street_no: data.street_no,
        street_name: data.street_name,
        apartment_name: data.apartment_name,
      });
      await this.streetRepository.save(streetEntity);
      console.log('Street saved:', streetEntity);

      const addressEntity = this.addressRepository.create({
        city: data.city,
        postal_code: data.postal_code,
        street: streetEntity,
      });

      await this.addressRepository.save(addressEntity);
      console.log('Address saved:', addressEntity);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

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
        password: hashedPassword,
      });
      await this.staffRepository.save(staffEntity);
      console.log('Staff created:', staffEntity);
      await this.regMailerService.sendRegistrationEmail(
        data.email,
        data.lastName,
      );
      console.log('Staff saved:', staffEntity);
    } catch (error) {
      console.error('Error creating staff:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create staff');
    }
  }
}
