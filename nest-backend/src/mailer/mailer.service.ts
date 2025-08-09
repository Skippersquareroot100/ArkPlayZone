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
}
