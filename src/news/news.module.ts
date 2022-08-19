import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [MailModule],
})
export class NewsModule {}
