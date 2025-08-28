import { TokenRequestDTO } from 'src/manager/DTOs/requestToken.dto';
import { VerifyOTPDTO } from 'src/manager/DTOs/verifyOTP.dto';

export interface StaffOTPInterface {
  generateOTP(data: TokenRequestDTO): Promise<void>;
  validateOTP(data: VerifyOTPDTO): Promise<{ message: string }>;
}
