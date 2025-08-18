import { Inject, Injectable } from '@nestjs/common';
import { StaffOTPInterface } from './interfaces/staffOTP.interface';
import { TokenRequestDTO } from '../DTOs/requestToken.dto';
import { VerifyOTPDTO } from '../DTOs/verifyOTP.dto';

@Injectable()
export class StaffOTPService {
  constructor(
    @Inject('StaffOTPInterface')
    private readonly staffOTPInterface: StaffOTPInterface,
  ) {}

  async generateOTP(data: TokenRequestDTO): Promise<void> {
    return await this.staffOTPInterface.generateOTP(data);
  }

  async validateOTP(data: VerifyOTPDTO): Promise<{ message: string }> {
    return await this.staffOTPInterface.validateOTP(data);
  }
}
