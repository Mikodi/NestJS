import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessGuard } from './guards/access/access.guard';
import { NewsModule } from './news/news.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [NewsModule, MailModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
