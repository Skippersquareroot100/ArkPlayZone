import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffLoginDTO } from '../DTOs/stafflogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Loginservice {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly authService: AuthService,
  ) {}
  async login(data: StaffLoginDTO) {
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
      select: ['staff_id', 'email', 'password'],
    });

    if (!staff || !staff.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValid = await bcrypt.compare(data.password, staff.password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateToken({
      id: staff.staff_id,
      email: staff.email,
    });

    return { access_token: token };
  }
}
