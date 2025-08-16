import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async send_email_with_text(to: string, subject: string, text: string) {
    if (!to) {
      return {
        status: 'error',
        message: 'Email address is required',
      };
    }
    await this.mailerService.sendMail({
      from: '"ArkPlayZone" <swajanbarua09@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    });
    return {
      status: 'success',
      message: 'Email sent successfully',
    };
  }

  async send_email_with_html(to: string, subject: string, body_html: string) {
    await this.mailerService.sendMail({
      from: '"ArkPlayZone" <swajanbarua09@gmail.com>',
      to: to,
      subject: subject,
      html: body_html,
    });
    return {
      status: 'success',
      message: 'Email sent successfully',
    };
  }

  async send_email_staffOTP(to: string, otp: string) {
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333;">ArkPlayZone - Password Reset OTP</h2>
      <p>Hi there,</p>
      <p>You requested a password reset. Use the OTP below to reset your password:</p>
      <p style="font-size: 24px; font-weight: bold; color: #1a73e8;">${otp}</p>
      <p>This OTP is valid for <strong>10 minutes</strong>.</p>
      <p>If you did not request this, please ignore this email.</p>
      <hr>
      <p style="font-size: 12px; color: #999;">ArkPlayZone Team</p>
    </div>
  `;

    await this.mailerService.sendMail({
      from: '"ArkPlayZone" <hasanmaruf0055@gmail.com>',
      to: to,
      subject: 'Your OTP Code for Password Reset',
      html: html,
    });

    return {
      status: 'success',
      message: 'OTP sent successfully',
    };
  }
}
