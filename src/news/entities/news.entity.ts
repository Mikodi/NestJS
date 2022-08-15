import { Comment } from 'src/news/entities/comment.entity';

export class News {
  id: number;
  author: string;
  title: string;
  text: string;
  comments: Comment[];
  date: string;
  thumbnail: string;
  attachments?: [string];
}
