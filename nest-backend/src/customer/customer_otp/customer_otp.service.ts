import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { generate } from "rxjs";
import { MailService } from "src/mailer/mailer.service";
import { Customer } from "../entities/customer.entity";
import {Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { customer_otp } from "../entities/cutomerOTP.entity";

@Injectable()
export class CustomerOtpService {
    constructor(private readonly mailService: MailService,
      @InjectRepository(Customer)
      private readonly customer_repository: Repository<Customer>,
      @InjectRepository(customer_otp)
      private readonly customer_otp_repository: Repository<customer_otp>,
      
    ) { }
    generate_otp(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
   welcome_body = `<div style="max-width:600px;margin:auto;padding:20px;border-radius:10px;background:linear-gradient(135deg,#fdfbfb,#ebedee);box-shadow:0 4px 8px rgba(0,0,0,0.1);font-family:'Segoe UI',Roboto,sans-serif;">
  <div style="text-align:center;margin-bottom:20px;">
    <h1 style="color:#28a745;">ArkPlayZone</h1>
    <p style="font-size:16px;color:#555;">Account Verified Successfully</p>
  </div>
  <div style="background:#ffffff;border-radius:8px;padding:30px;text-align:center;">
    <p style="font-size:18px;color:#333;">Hello!</p>
    <p style="font-size:16px;color:#666;">Your account has been successfully verified. You can now enjoy full access to ArkPlayZone.</p>
    <a href="" target="_blank" style="display:inline-block;margin-top:20px;background-color:#28a745;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;">Login Now</a>
  </div>
  <div style="text-align:center;margin-top:30px;">
    <p style="font-size:14px;color:#888;">If you have any questions, feel free to contact our support team.</p>
  </div>
  <div style="text-align:center;margin-top:20px;">
    <p style="font-size:12px;color:#aaa;">&copy; 2025 ArkPlayZone. All rights reserved.</p>
  </div>
</div>`;


    otp_body(otp: number): string {
        return `<div style="max-width:600px;margin:auto;padding:20px;border-radius:10px;background:linear-gradient(135deg,#fdfbfb,#ebedee);box-shadow:0 4px 8px rgba(0,0,0,0.1);font-family:'Segoe UI',Roboto,sans-serif;">
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
  </div>`;
    }
    async send_otp(email: string) {
        const otp = this.generate_otp();
        const subject = "Your OTP from ArkPlayZone";
        const body = this.otp_body(otp);
        const resp = await this.mailService.send_email_with_html(email, subject, body);
        if(resp.status == 'success'){
            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                message: 'OTP sent successfully',
                otp: otp
            };
        }else{
            return {
                status: 'error',
                message: 'Failed to send OTP',
            };
        }

    }
    async resend_otp(old_otp : customer_otp){
        const new_otp = await this.send_otp(old_otp.customer_id.email);
        const new_otp_entry = this.customer_otp_repository.create({
          customer_id : old_otp.customer_id,
          otp_key : new_otp.otp
        })
        await this.customer_otp_repository.remove(old_otp);
        const saved_otp_entry = await this.customer_otp_repository.save(new_otp_entry);
        
        return {
            status: 'success',
            message: 'OTP sent successfully',
            otp_signature: saved_otp_entry.otp_signature,
            otp: saved_otp_entry.otp_key,
        };
    }
    async verify_otp(otp_signature : string, otp : number){
        const otp_entry = await this.customer_otp_repository.findOne({
          where : {
            otp_signature },
            relations: ['customer_id']

        });
        if(!otp_entry){
            return {
                status: 'failed',
                message: 'Invalid OTP ',
            };
        }
        const now = new Date().getTime();
        const creation_time = new Date(otp_entry.creation_time).getTime();
        const diff = now - creation_time;
        // when tryes to verify otp more than 5 times
        if(otp_entry.otp_send_count >5){
            
            if(diff > 3 * 60 * 1000){
               this.resend_otp(otp_entry);
            }
            return {
                status: 'failed',
                message: `OTP limit exceeded, plase try again after ${Math.max(0,Math.round((30-(diff/(60*1000)))))} minutes`,
            };
        }

        // when otp time expired
        if(diff >10 * 60 * 1000){
          this.resend_otp(otp_entry);
          return {
            status: 'failed',
            message: 'OTP expired, please request a new OTP',
          };
        }
        if(otp_entry.otp_key !== otp){
            otp_entry.otp_send_count += 1;
            await this.customer_otp_repository.save(otp_entry);
            return {
                status: 'failed',
                message: 'Invalid OTP, please try again',
            };
        }else{
            await this.customer_otp_repository.remove(otp_entry);
            await this.mailService.send_email_with_html(otp_entry.customer_id.email,'Your Account is Verified',this.welcome_body);
            return {
                status: 'success',
                message: 'OTP verified successfully',
            };
        }


    }







}