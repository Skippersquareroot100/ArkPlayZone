import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { address_dto, create_customer_dto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
    address_entity,
    customer_Entity,
    Gender,
    otp_entity,
} from './customer.entity';
import { Repository, Between } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class CustomerService {
    constructor(
        private readonly mailerService: MailerService,
        @InjectRepository(customer_Entity)
        private customer_repository: Repository<customer_Entity>,
        @InjectRepository(address_entity)
        private address_repository: Repository<address_entity>,
        @InjectRepository(otp_entity)
        private otp_repository: Repository<otp_entity>,
    ) { }

    show() {
        return ['test', '123'];
    }
    async send_otp(email: string, customer: customer_Entity) {
        const otp = Math.floor(10000 + Math.random() * 90000);

        const new_otp = this.otp_repository.create({
            otp_key: otp,
            customer_id: customer,
        });

        const otpp = await this.otp_repository.save(new_otp);

        await this.mailerService.sendMail({
            from: '"ArkPlayZone" <swajanbarua09@gmail.com>',
            to: `${email}`, // receiver
            subject: 'Your OTP from ArkPlayZone',
            //text: 'Hello! This is a test email from ArkPlayZone.',
            html: `<div style="max-width:600px;margin:auto;padding:20px;border-radius:10px;background:linear-gradient(135deg,#fdfbfb,#ebedee);box-shadow:0 4px 8px rgba(0,0,0,0.1);font-family:'Segoe UI',Roboto,sans-serif;">
    <div style="text-align:center;margin-bottom:20px;">
      <h1 style="color:#4287f5;
      ">ArkPlayZone</h1>
      <p style="font-size:16px;color:#555;">Your One-Time Password (OTP)</p>
    </div>
    <div style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">
      <p style="font-size:18px;color:#333;">Use the OTP below to complete your action:</p>
      <div style="margin:20px auto;font-size:32px;font-weight:bold;color:#e74c3c;border:2px dashed #e74c3c;width:200px;padding:10px;border-radius:8px;background:#fefefe;">
        <span>${otp}</span>
      </div>
      <p style="color:#666;font-size:14px;">This OTP is valid for the next <strong>10 minutes</strong>.</p>
    </div>
    <div style="text-align:center;margin-top:30px;">
      <p style="font-size:14px;color:#888;">If you didn’t request this, please ignore this email.</p>
    </div>
    <div style="text-align:center;margin-top:20px;">
      <p style="font-size:12px;color:#aaa;">&copy; 2025 ArkPlayZone. All rights reserved.</p>
    </div>
  </div>`,
        });

        return {
            status: 'success',
            otp_sig: otpp.otp_signature,
        };
    }

    async register_customer(
        dto: create_customer_dto,
        addressDto: address_dto,
        file?: Express.Multer.File,
    ) {
        const new_address = this.address_repository.create({
            city: addressDto.city,
            country: addressDto.country,
            postal_code: addressDto.postal_code,
            street_no: addressDto.street_no,
            street_name: addressDto.street_name || 'Unknown', // default value
        });
        const savedAddress = await this.address_repository.save(new_address);
        const new_customer = this.customer_repository.create({
            first_name: dto.first_name,
            last_name: dto.last_name,
            password: dto.password,
            gender: dto.gender as Gender,
            date_of_birth: dto.date_of_birth,
            phone_number: dto.phone_number,
            email: dto.email,
            image_path: file?.path || undefined,
            address: savedAddress,
        });

        return await this.send_otp(
            new_customer.email,
            await this.customer_repository.save(new_customer),
        );
    }

    async verify_account(otp: number, otp_sig: string) {
        const otp_resp = await this.otp_repository.find({
            where: { otp_signature: otp_sig },
            relations: ['customer_id'],
        });

        var otp_obj = otp_resp[0];
        if (!otp_obj) {
            return {
                status: 'failed',
                message: 'Invalid otp signature',
                res: otp_resp,
                sig: otp_sig,
            };
        }
        //console.log(otp_obj.creation_time)
        const now = Date.now();
        const created_at = new Date(otp_obj.creation_time).getTime();
        const expire_time = 10 * 60 * 1000;

        if (otp_obj.otp_send_count > 5) {
            const new_otp = Math.floor(10000 + Math.random() * 90000);
            otp_obj.otp_send_count = 0;
            otp_obj.creation_time = new Date();
            otp_obj.otp_key = new_otp;
            this.otp_repository.save(otp_obj);
            const cutomer_email = otp_obj.customer_id.email;
            this.otp_repository.save(otp_obj);

            await this.mailerService.sendMail({
                from: '"ArkPlayZone" <swajanbarua09@gmail.com>',
                to: `${cutomer_email}`, // receiver
                subject: 'Your NEW OTP from ArkPlayZone',
                //text: 'Hello! This is a test email from ArkPlayZone.',
                html: `<div style="max-width:600px;margin:auto;padding:20px;border-radius:10px;background:linear-gradient(135deg,#fdfbfb,#ebedee);box-shadow:0 4px 8px rgba(0,0,0,0.1);font-family:'Segoe UI',Roboto,sans-serif;">
    <div style="text-align:center;margin-bottom:20px;">
      <h1 style="color:#4287f5;
      ">ArkPlayZone</h1>
      <p style="font-size:16px;color:#555;">Your One-Time Password (OTP)</p>
    </div>
    <div style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">
      <p style="font-size:18px;color:#333;">Use the OTP below to complete your action:</p>
      <div style="margin:20px auto;font-size:32px;font-weight:bold;color:#e74c3c;border:2px dashed #e74c3c;width:200px;padding:10px;border-radius:8px;background:#fefefe;">
        <span>${new_otp}</span>
      </div>
      <p style="color:#666;font-size:14px;">This OTP is valid for the next <strong>10 minutes</strong>.</p>
    </div>
    <div style="text-align:center;margin-top:30px;">
      <p style="font-size:14px;color:#888;">If you didn’t request this, please ignore this email.</p>
    </div>
    <div style="text-align:center;margin-top:20px;">
      <p style="font-size:12px;color:#aaa;">&copy; 2025 ArkPlayZone. All rights reserved.</p>
    </div>
  </div>`,
            });
            return {
                status: 'failed',
                message: 'Too Many Attempt !! , Enter New OTP',
            };
        }

        if (now - created_at > expire_time) {
            const new_otp = Math.floor(10000 + Math.random() * 90000);

            otp_obj.creation_time = new Date();
            otp_obj.otp_key = new_otp;
            this.otp_repository.save(otp_obj);

            await this.mailerService.sendMail({
                from: '"ArkPlayZone" <swajanbarua09@gmail.com>',
                to: `${otp_obj.customer_id.email}`, // receiver
                subject: 'Your NEW OTP from ArkPlayZone',
                //text: 'Hello! This is a test email from ArkPlayZone.',
                html: `<div style="max-width:600px;margin:auto;padding:20px;border-radius:10px;background:linear-gradient(135deg,#fdfbfb,#ebedee);box-shadow:0 4px 8px rgba(0,0,0,0.1);font-family:'Segoe UI',Roboto,sans-serif;">
    <div style="text-align:center;margin-bottom:20px;">
      <h1 style="color:#4287f5;
      ">ArkPlayZone</h1>
      <p style="font-size:16px;color:#555;">Your One-Time Password (OTP)</p>
    </div>
    <div style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">
      <p style="font-size:18px;color:#333;">Use the OTP below to complete your action:</p>
      <div style="margin:20px auto;font-size:32px;font-weight:bold;color:#e74c3c;border:2px dashed #e74c3c;width:200px;padding:10px;border-radius:8px;background:#fefefe;">
        <span>${new_otp}</span>
      </div>
      <p style="color:#666;font-size:14px;">This OTP is valid for the next <strong>10 minutes</strong>.</p>
    </div>
    <div style="text-align:center;margin-top:30px;">
      <p style="font-size:14px;color:#888;">If you didn’t request this, please ignore this email.</p>
    </div>
    <div style="text-align:center;margin-top:20px;">
      <p style="font-size:12px;color:#aaa;">&copy; 2025 ArkPlayZone. All rights reserved.</p>
    </div>
  </div>`,
            });

            return {
                status: 'failed',
                message: 'OTP Expired, Enter New OTP',
            };
        }

        if (otp_obj.otp_key === otp) {
            otp_obj.customer_id.status = 'active'
            this.customer_repository.save(otp_obj.customer_id);
            await this.mailerService.sendMail({
                to: `${otp_obj.customer_id.email}`,
                from: '"ArkPlayZone" <swajanbarua09@gmail.com>',
                subject: 'Your Account is Verified - ArkPlayZone',
                html: `<div style="max-width:600px;margin:auto;padding:20px;border-radius:10px;background:linear-gradient(135deg,#fdfbfb,#ebedee);box-shadow:0 4px 8px rgba(0,0,0,0.1);font-family:'Segoe UI',Roboto,sans-serif;">
  <div style="text-align:center;margin-bottom:20px;">
    <h1 style="color:#28a745;">ArkPlayZone</h1>
    <p style="font-size:16px;color:#555;">Account Verified Successfully</p>
  </div>
  <div style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">
    <p style="font-size:18px;color:#333;">Hello!</p>
    <p style="font-size:16px;color:#666;">Your account has been successfully verified. You can now enjoy full access to ArkPlayZone.</p>
    <a href="https://arkplayzone.example.com/login" target="_blank" style="display:inline-block;margin-top:20px;background-color:#28a745;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;">Login Now</a>
  </div>
  <div style="text-align:center;margin-top:30px;">
    <p style="font-size:14px;color:#888;">If you have any questions, feel free to contact our support team.</p>
  </div>
  <div style="text-align:center;margin-top:20px;">
    <p style="font-size:12px;color:#aaa;">&copy; 2025 ArkPlayZone. All rights reserved.</p>
  </div>
</div>`});
                await this.otp_repository.remove(otp_obj);
            return {
                status: 'success',
                message: 'Account Validation Sccessful',
            };
        } else {
            otp_obj.otp_send_count += 1;
            this.otp_repository.save(otp_obj);
            return {
                status: 'failed',
                message: 'OTP does not match',
            };
        }
    }
}
