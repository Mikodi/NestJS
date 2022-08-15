// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { NewsService } from './news.service';
import { Attachments, CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto, AnswerToCommentDto } from './dto/create-comment.dto';
import { Public } from 'src/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('news')
export class NewsController {
  commentsService: any;
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploades/thumbnails',
        filename: (_req, file, cb) => {
          const typeOfImage = file.originalname.split('.')[1];
          if (
            typeOfImage === 'png' ||
            typeOfImage === 'jpeg' ||
            typeOfImage === 'jpg' ||
            typeOfImage === 'gif'
          ) {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          } else {
            throw new Error('Неверный тип файла');
          }
        },
      }),
    }),
  )
  // @SetMetadata('roles', ['admin'])
  @Public()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto,
  ) {
    return this.newsService.create({
      ...createNewsDto,
      thumbnail: `thumbnails/${file.filename}`,
    });
  }

  @Post('comment')
  @UseInterceptors(
    FileInterceptor('attachments', {
      storage: diskStorage({
        destination: './uploades/comments/files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Public()
  createComment(
    @UploadedFile() attachments: Express.Multer.File,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.newsService.createComment({
      ...createCommentDto,
      id: +createCommentDto.id,
      attachments: `comments/files/${attachments.filename}`,
    });
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('attachments', {
      storage: diskStorage({
        destination: './uploades/news/files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Public()
  createNewsAttachments(
    @UploadedFile() newsAttachments: Express.Multer.File,
    @Param('id') id: string,
    @Body() attachmentsDto: Attachments,
  ) {
    return this.newsService.createNewsAttachments(+id, {
      ...attachmentsDto,
      attachments: `news/files/${newsAttachments.filename}`,
    });
  }

  @Post('comment/:id')
  @Public()
  answerToComment(
    @Param('id') id: string,
    @Body() answerToCommentDto: AnswerToCommentDto,
  ) {
    return this.newsService.answerToComment(+id, answerToCommentDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Patch('comment/:id')
  @Public()
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.newsService.updateComment(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
function thumbnail(_arg0: any, _thumbnail: any, _path: string) {
  throw new Error('Function not implemented.');
}
