// src/auth/refreshToken.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Staff } from 'src/manager/entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRequestDTO } from '../DTOs/requestToken.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private readonly authService: AuthService,
  ) {}

  async refreshToken(data: TokenRequestDTO) {
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
      select: ['staff_id', 'email'], 
    });

    if (!staff || !staff.password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.authService.generateToken({
      id: staff.staff_id,
      email: staff.email,
    });

    return { access_token: token };
  }
}
