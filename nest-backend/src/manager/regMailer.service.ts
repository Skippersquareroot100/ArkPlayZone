import { Injectable } from '@nestjs/common';
import { MailService } from '../mailer/mailer.service';

@Injectable()
export class RegMailerService {
  constructor(private readonly mailService: MailService) {}

  async sendRegistrationEmail(email: string, name:string) {
    const subject = 'Welcome to ArkPlayZone!';
    const text = `Hello ${name},
                  Thank you for registering with ArkPlayZone! We're excited to have you on board.
                  If you have any questions or need assistance, feel free to reach out to our support team.
                  Best regards,
                  The ArkPlayZone Team`;
    return await this.mailService.send_email_with_text(email, subject, text);
  }
}
