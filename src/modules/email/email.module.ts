import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { envs } from 'src/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: envs.redisHost,
        port: envs.redisPort,
        password: envs.redisPassword || undefined,
      },
    }),
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
