import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginInterface } from '../interfaces/login.interface';
import { StaffLoginDTO } from 'src/manager/DTOs/stafflogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Staff } from 'src/manager/entities/staff.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerCredentials } from 'src/customer/entities/customercredentials.entity';

@Injectable()
export class LoginImplementation implements LoginInterface {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(CustomerCredentials)
    private readonly customerCredentialsRepository: Repository<CustomerCredentials>,
    private readonly authService: AuthService,
  ) {}
  async login(
    data: StaffLoginDTO,
  ): Promise<{ access_token: string; role: string; sid?: number }> {
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
      select: ['staff_id', 'email', 'password', 'role'],
    });

    if (!staff || !staff.password) {
      const customer = await this.customerRepository.findOne({
        where: { email: data.email },
        relations: ['credentials'],
        select: {
          customer_id: true,
          email: true,
          credentials: {
            password: true,
          },
        },
      });

      if (!customer) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const isCustomerValid = await bcrypt.compare(
        data.password,
        customer?.credentials.password ?? '',
      );
      if (!isCustomerValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const customer_token = this.authService.generateToken({
        id: customer.customer_id ?? 123,
        email: customer.email ?? '',
        role: 'customer',
      });
      return { access_token: customer_token, role: 'customer' };
    }

    const isValid = await bcrypt.compare(data.password, staff.password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateToken({
      id: staff.staff_id,
      email: staff.email,
      role: staff.role,
    });

    return { access_token: token, role: staff.role, sid: staff.staff_id };
  }
}
