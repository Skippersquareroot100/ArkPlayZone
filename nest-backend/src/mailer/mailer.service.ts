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
    reset_password_body = `<div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
  <p>Your password has been changed successfully.</p>
  <p>If this was not you, please reset your password immediately or contact support.</p>
</div>`
}
