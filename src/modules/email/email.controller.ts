import { Controller } from '@nestjs/common';
import type { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  private readonly emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }
}
