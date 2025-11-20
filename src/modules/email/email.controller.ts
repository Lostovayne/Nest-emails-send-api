import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from 'src/common/dtos';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
