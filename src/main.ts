import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import { LoggingTimeInterceptor } from './interseptors/logging-time/logging-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingTimeInterceptor());
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    fallthrough: true,
  });
  app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: join(process.cwd(), 'views/layouts'),
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );
  hbs.registerPartials(process.cwd() + '/views/partials');
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
