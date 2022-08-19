import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { News } from 'src/news/entities/news.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTest() {
    console.log('Отправляется тестовое письмо');
    try {
      return await this.mailerService.sendMail({
        to: 'plainde@mail.ru',
        subject: 'Первое тестовое письмо',
        template: './test',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendNewNewsForAdmins(emails: string[], news: News): Promise<void> {
    console.log('Отправляются письма о новой новости администрации ресурса');
    for (const email of emails) {
      try {
        const sentMessageInfo = await this.mailerService.sendMail({
          to: email,
          subject: `Создана новая новость: ${news.title}`,
          template: './new-news',
          context: news,
        });
        console.log(sentMessageInfo);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
