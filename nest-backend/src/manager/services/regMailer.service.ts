import { Injectable } from '@nestjs/common';
import { MailService } from '../../mailer/mailer.service';

@Injectable()
export class RegMailerService {
  constructor(private readonly mailService: MailService) {}

  async sendRegistrationEmail(email: string, name: string) {
    const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: auto; background: #f7f9fc; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <div style="text-align: center; padding-bottom: 20px;">
        <h1 style="font-size: 28px; color: #1a73e8; margin-bottom: 0;">🎉 Welcome to ArkPlayZone, ${name}! 🎉</h1>
        <p style="color: #555; font-size: 16px; margin-top: 5px;">Your adventure with us begins today 🚀</p>
      </div>

      <div style="background: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <p style="font-size: 16px; color: #333;">Hi ${name},</p>
        <p style="font-size: 16px; color: #333;">Thank you for registering with <strong>ArkPlayZone</strong>! We're thrilled to have you on board. Get ready to explore amazing features and enjoy a seamless experience. ✨</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <a href="https://arkplayzone.com/login" 
             style="display: inline-block; background: linear-gradient(90deg, #1a73e8, #4285f4); color: #fff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
            🚀 Get Started
          </a>
        </div>

        <p style="font-size: 14px; color: #777;">If you have any questions or need assistance, our support team is here for you. 💬</p>
        <p style="font-size: 14px; color: #777;">Cheers,<br><strong>The ArkPlayZone Team ✨</strong></p>
      </div>

      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
        © 2025 ArkPlayZone. All rights reserved.
      </div>
    </div>
  `;

    return await this.mailService.send_email_with_html(
      email,
      '🚀 Welcome to ArkPlayZone, ' + name + '!',
      html,
    );
  }
}
