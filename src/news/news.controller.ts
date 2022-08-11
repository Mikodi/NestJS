// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto, AnswerToCommentDto } from './dto/create-comment.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('news')
export class NewsController {
  commentsService: any;
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @SetMetadata('roles', ['admin'])
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Post('comment')
  @Public()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.newsService.createComment(createCommentDto);
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
