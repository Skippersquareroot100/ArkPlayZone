import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginInterface } from '../interfaces/login.interface';
import { StaffLoginDTO } from 'src/manager/DTOs/stafflogin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Staff } from 'src/manager/entities/staff.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginImplementation implements LoginInterface {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly authService: AuthService,
  ) {}
  async login(
    data: StaffLoginDTO,
  ): Promise<{ access_token: string; role: string }> {
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
      select: ['staff_id', 'email', 'password', 'role'],
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

    return { access_token: token, role: staff.role };
  }
}
