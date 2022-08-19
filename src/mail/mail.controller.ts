import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @Public()
  async sendTestEmail() {
    return await this.mailService.sendTest();
  }
}
