import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerController as MailController } from './mailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        ignoreTLS: true,
        auth: {
          user: 'hasanmaruf0055@gmail.com',
          pass: '',
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
