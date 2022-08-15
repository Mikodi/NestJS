import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AnswerToCommentDto,
  CreateCommentDto,
} from 'src/news/dto/create-comment.dto';
import { Comment } from 'src/news/entities/comment.entity';
import { Attachments, CreateNewsDto } from './dto/create-news.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  private news: News[] = [];

  create(createNewsDto: CreateNewsDto) {
    const news: News = {
      ...createNewsDto,
      id: this.news.length + 1,
      author: 'Maria',
      comments: [],
      attachments: ['true'],
      date: new Date().toUTCString(),
      thumbnail: createNewsDto.thumbnail,
    };
    this.news.push(news);
  }

  createNewsAttachments(id: number, attachmentsDto: Attachments) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    if (news.attachments[0] === 'true') {
      news.attachments.pop();
    }
    news.attachments.push(attachmentsDto.attachments);
  }

  createComment(createCommentDto: CreateCommentDto) {
    const newsId = createCommentDto.id;
    console.log(newsId);
    const news = this.findOne(newsId);
    const comments: Comment = {
      id: news.comments.length + 1,
      author: 'Maria',
      text: createCommentDto.text,
      attachments: [createCommentDto.attachments],
      comments: [],
      date: new Date().toUTCString(),
    };

    this.news[newsId - 1].comments.push(comments);
  }

  answerToComment(id: number, answerToComment: AnswerToCommentDto) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    if (news.comments.length === 0) {
      throw new NotFoundException();
    }

    news.comments.forEach((comment) => {
      if (news.comments.length < answerToComment.id) {
        throw new NotFoundException();
      }

      if (comment.id === answerToComment.id) {
        const comments: Comment = {
          id: comment.comments.length + 1,
          author: 'Maria',
          text: answerToComment.text,
          date: new Date().toUTCString(),
        };

        comment.comments.push(comments);
      }
    });
  }

  findAll() {
    return this.news;
  }

  findOne(id: number) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    return news;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    news.text = updateNewsDto.text;
    news.date = new Date().toUTCString();
    return news;
  }

  updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const news = this.news.find((news) => news.id === id);

    if (!news) {
      throw new NotFoundException();
    }

    news.comments.forEach((comment) => {
      if (news.comments.length < updateCommentDto.id) {
        throw new NotFoundException();
      }

      if (comment.id === updateCommentDto.id) {
        comment.text = updateCommentDto.text;
        news.comments[updateCommentDto.id - 1].text = comment.text;
        news.comments[updateCommentDto.id - 1].date = new Date().toUTCString();
        return news;
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
