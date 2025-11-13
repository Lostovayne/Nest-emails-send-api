import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { SendEmailDto } from 'src/common/dtos';
import { createTransport } from 'src/config/nodemailer';

@Processor('email-queue')
export class EmailProcessor {
  @Process('send-email')
  async handleSendEmail(job: Job<SendEmailDto>) {
    const { smtpConfig, mailOptions } = job.data;
    const transporter = createTransport(smtpConfig);

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Failed to send email: ${error}`);
    }
  }
}
