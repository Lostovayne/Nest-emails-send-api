import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bull';
import { SendEmailDto } from 'src/common/dtos';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('email-queue')
    private readonly emailQueue: Queue,
  ) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { smtpConfig, mailOptions } = sendEmailDto;

    try {
      await this.emailQueue.add(
        'send-email',
        {
          smtpConfig,
          mailOptions,
        },
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      );
    } catch (error) {
      if (error instanceof error)
        throw new Error('Hubo un error al crear el proceso' + error);
    }
  }
}
