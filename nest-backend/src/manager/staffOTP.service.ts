import { HttpException, Injectable } from '@nestjs/common';
import { TokenRequestDTO } from './DTOs/requestToken.dto';
import { VerifyOTPDTO } from './DTOs/verifyOTP.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { StaffOTP } from './entities/staffOTP.entity';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class StaffOTPService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailService: MailService,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(StaffOTP)
    private readonly staffOTPRepository: Repository<StaffOTP>,
  ) {}

  async generateOTP(data: TokenRequestDTO) {
    console.log('Validating OTP for email:', data.email);
    const email = data.email.trim().toLowerCase();
    const staff = await this.staffRepository.findOne({
      where: { email: email },
    });
    console.log('Staff found:', staff);
    if (!staff) {
      throw new HttpException('Staff not found', 404);
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let staffOTP = await this.staffOTPRepository.findOne({
      where: { staff: { staff_id: staff.staff_id } },
    });

    if (!staffOTP) {
      staffOTP = this.staffOTPRepository.create({
        OTP: otp,
        expiresAt: expiresAt,
        used: false,
        staff: staff,
      });
    } else {
      staffOTP.OTP = otp;
      staffOTP.expiresAt = expiresAt;
      staffOTP.used = false;
      staffOTP.staff = staff;
    }
    await this.staffOTPRepository.save(staffOTP);

    await this.mailService.send_email_staffOTP(staff.email, otp);
  }

  async validateOTP(data: VerifyOTPDTO) {

    
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
    });
    if (!staff) {
      throw new HttpException('Staff not found', 404);
    }

    const staffotp = await this.staffOTPRepository
      .createQueryBuilder('otp')
      .leftJoinAndSelect('otp.staff', 'staff')
      .addSelect(['otp.expiresAt', 'otp.OTP', 'otp.used'])
      .where('staff.email=:email', { email: data.email })
      .getOne();

    if (!staffotp) {
      throw new HttpException('OTP not found for this email', 404);
    }
    if (staffotp.OTP !== data.otp) {
      throw new HttpException('Invalid OTP', 400);
    }

    if (staffotp.used) {
      throw new HttpException('OTP has already been used', 400);
    }

    if (staffotp.expiresAt < new Date()) {
      throw new HttpException('OTP has expired', 400);
    }

    staffotp.used = true;
    await this.staffOTPRepository.save(staffotp);

    return { message: 'OTP validated successfully' };
  }
}
